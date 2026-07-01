import SwiftUI

struct ContentView: View {
    @EnvironmentObject private var store: GameStore

    var body: some View {
        ZStack {
            Theme.background.ignoresSafeArea()

            switch store.screen {
            case .home:
                HomeView()
            case .settings:
                SettingsView()
            case .backpack:
                BackpackView()
            case .shop:
                ShopView()
            case .salon:
                SalonView()
            case .arCamera:
                ARCameraView()
            }
        }
        .font(Theme.roundedFont)
        .foregroundStyle(Theme.ink)
    }
}

