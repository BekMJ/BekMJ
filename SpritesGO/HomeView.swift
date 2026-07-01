import SwiftUI

struct HomeView: View {
    @EnvironmentObject private var store: GameStore

    var body: some View {
        VStack(spacing: 18) {
            Spacer(minLength: 28)

            VStack(spacing: 8) {
                Text("Sprites GO")
                    .font(Theme.titleFont)
                    .foregroundStyle(Theme.ink)
                Text("Dollars: \(store.moneyText)")
                    .font(.system(.title3, design: .rounded).weight(.bold))
                    .padding(.horizontal, 18)
                    .padding(.vertical, 8)
                    .background(Capsule().fill(.white.opacity(0.62)))
            }

            Spacer()

            SpriteArtView(sprite: store.activeSprite, effects: store.effects(for: store.activeSprite), size: 210)

            HStack(spacing: 24) {
                iconButton("gearshape.fill", label: "Settings") { store.navigate(to: .settings) }

                Button {
                    store.navigate(to: .arCamera)
                } label: {
                    Text("PLAY")
                        .font(.system(size: 34, weight: .black, design: .rounded))
                        .frame(width: 160, height: 86)
                }
                .buttonStyle(PastelButtonStyle(color: Theme.lemon))

                iconButton("backpack.fill", label: "Backpack") { store.navigate(to: .backpack) }
            }

            Spacer()

            HStack {
                iconButton("dollarsign.circle.fill", label: "Shop") { store.navigate(to: .shop) }
                Spacer()
                iconButton("paintbrush.pointed.fill", label: "Salon") { store.navigate(to: .salon) }
            }
            .padding(.horizontal, 30)
            .padding(.bottom, 28)
        }
        .padding()
    }

    private func iconButton(_ name: String, label: String, action: @escaping () -> Void) -> some View {
        Button(action: action) {
            Image(systemName: name)
                .font(.system(size: 28, weight: .bold))
                .foregroundStyle(Theme.ink)
                .frame(width: 64, height: 64)
        }
        .buttonStyle(PastelButtonStyle(color: Theme.sky.opacity(0.9)))
        .accessibilityLabel(label)
    }
}

