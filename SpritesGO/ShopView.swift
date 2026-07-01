import SwiftUI

struct ShopView: View {
    @EnvironmentObject private var store: GameStore
    private let columns = [GridItem(.adaptive(minimum: 150), spacing: 14)]

    var body: some View {
        VStack(spacing: 8) {
            HStack {
                CloseButton { store.goHome() }
                Spacer()
                VStack {
                    Text("SHOP").font(.system(.largeTitle, design: .rounded).weight(.black))
                    Text("Dollars: \(store.moneyText)").font(.headline.bold())
                }
                Spacer()
                Color.clear.frame(width: 46, height: 46)
            }
            .padding()

            ScrollView {
                VStack(alignment: .leading, spacing: 24) {
                    shopSection("Consumable Items", price: "$10.00") {
                        LazyVGrid(columns: columns, spacing: 14) {
                            ForEach(SpriteCatalog.shopItems) { item in
                                Button {
                                    store.buy(item: item)
                                } label: {
                                    shopCard(title: item.name, subtitle: item.isConsumable ? "Consumable" : "Reusable", symbol: symbol(for: item.effect), color: Theme.pink)
                                }
                                .buttonStyle(.plain)
                                .disabled(store.state.money < 10)
                            }
                        }
                    }

                    shopSection("Sprite Store", price: "$50.00") {
                        LazyVGrid(columns: columns, spacing: 14) {
                            ForEach(store.shopSprites) { sprite in
                                Button {
                                    store.buy(sprite: sprite)
                                } label: {
                                    VStack(spacing: 8) {
                                        SpriteArtView(sprite: sprite, size: 108)
                                        Text(sprite.name).font(.system(.subheadline, design: .rounded).weight(.black))
                                        Text(sprite.personality).font(.caption).multilineTextAlignment(.center).lineLimit(2)
                                    }
                                    .frame(maxWidth: .infinity, minHeight: 184)
                                    .padding(10)
                                    .background(RoundedRectangle(cornerRadius: 20).fill(.white.opacity(0.68)))
                                }
                                .buttonStyle(.plain)
                                .disabled(store.state.money < 50)
                            }
                        }
                    }
                }
                .padding()
            }
        }
    }

    private func shopSection<Content: View>(_ title: String, price: String, @ViewBuilder content: () -> Content) -> some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Text(title).font(.system(.title3, design: .rounded).weight(.black))
                Spacer()
                Text(price).font(.headline.bold()).padding(.horizontal, 12).padding(.vertical, 6).background(Capsule().fill(Theme.lemon))
            }
            content()
        }
    }

    private func shopCard(title: String, subtitle: String, symbol: String, color: Color) -> some View {
        VStack(spacing: 10) {
            Image(systemName: symbol)
                .font(.system(size: 34, weight: .bold))
                .frame(width: 68, height: 68)
                .background(Circle().fill(color.opacity(0.72)))
            Text(title).font(.system(.subheadline, design: .rounded).weight(.black)).multilineTextAlignment(.center)
            Text(subtitle).font(.caption.bold()).foregroundStyle(Theme.coral)
        }
        .frame(maxWidth: .infinity, minHeight: 142)
        .padding(10)
        .background(RoundedRectangle(cornerRadius: 20).fill(.white.opacity(0.68)))
    }

    private func symbol(for effect: ItemEffect) -> String {
        switch effect {
        case .food: return "takeoutbag.and.cup.and.straw.fill"
        case .darkCloak: return "moon.stars.fill"
        case .lightDress: return "tshirt.fill"
        case .crown: return "crown.fill"
        case .collar: return "sparkles"
        case .caviar: return "birthday.cake.fill"
        }
    }
}

