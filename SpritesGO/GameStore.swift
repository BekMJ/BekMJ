import Foundation
import SwiftUI

#if os(iOS)
import UIKit
#endif

@MainActor
final class GameStore: ObservableObject {
    @Published var screen: Screen = .home
    @Published private(set) var state: GameState

    private let saveKey = "SpritesGO.GameState.v1"

    init() {
        if let data = UserDefaults.standard.data(forKey: saveKey),
           let decoded = try? JSONDecoder().decode(GameState.self, from: data) {
            state = decoded
        } else {
            state = GameState()
        }
    }

    var moneyText: String {
        let value = NSDecimalNumber(decimal: state.money).doubleValue
        return String(format: "$%.2f", value)
    }

    var activeSprite: SpriteDefinition {
        SpriteCatalog.sprite(id: state.activeSpriteID)
    }

    var ownedSprites: [SpriteDefinition] {
        SpriteCatalog.sprites.filter { state.ownedSpriteIDs.contains($0.id) }
    }

    var shopSprites: [SpriteDefinition] {
        SpriteCatalog.sprites.filter { !state.ownedSpriteIDs.contains($0.id) }
    }

    func goHome() {
        screen = .home
    }

    func navigate(to screen: Screen) {
        self.screen = screen
    }

    func buy(item: InventoryItem) {
        guard spend(10) else { return }
        state.ownedItems.append(item)
        persistAndCelebrate()
    }

    func buy(sprite: SpriteDefinition) {
        guard !state.ownedSpriteIDs.contains(sprite.id), spend(50) else { return }
        state.ownedSpriteIDs.append(sprite.id)
        persistAndCelebrate()
    }

    func select(sprite: SpriteDefinition) {
        guard state.ownedSpriteIDs.contains(sprite.id) else { return }
        state.activeSpriteID = sprite.id
        persist()
    }

    func apply(item: InventoryItem) {
        var effects = state.appliedEffectsBySpriteID[state.activeSpriteID] ?? []
        effects.insert(item.effect)
        state.appliedEffectsBySpriteID[state.activeSpriteID] = effects

        if item.isConsumable,
           let index = state.ownedItems.firstIndex(where: { $0.id == item.id }) {
            state.ownedItems.remove(at: index)
            addMoney(2)
        }
        persistAndCelebrate()
    }

    func completeSalonSession() {
        addMoney(10)
        persistAndCelebrate()
    }

    func updateSettings(_ settings: AppSettings) {
        state.settings = settings
        persist()
    }

    func effects(for sprite: SpriteDefinition) -> Set<ItemEffect> {
        state.appliedEffectsBySpriteID[sprite.id] ?? []
    }

    private func spend(_ amount: Decimal) -> Bool {
        guard state.money >= amount else { return false }
        state.money -= amount
        return true
    }

    private func addMoney(_ amount: Decimal) {
        state.money += amount
    }

    private func persistAndCelebrate() {
        persist()
        #if os(iOS)
        UIImpactFeedbackGenerator(style: .soft).impactOccurred()
        #endif
    }

    private func persist() {
        if let data = try? JSONEncoder().encode(state) {
            UserDefaults.standard.set(data, forKey: saveKey)
        }
    }
}
