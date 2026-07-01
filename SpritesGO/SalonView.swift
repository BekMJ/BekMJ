import SwiftUI

struct SalonView: View {
    @EnvironmentObject private var store: GameStore
    @State private var selectedTool: SalonTool = .brush
    @State private var effects = SalonEffects()
    @State private var didReward = false

    var body: some View {
        VStack(spacing: 12) {
            HStack {
                CloseButton {
                    finishAndLeave()
                }
                Spacer()
                Text("Salon").font(.system(.largeTitle, design: .rounded).weight(.black))
                Spacer()
                Color.clear.frame(width: 46, height: 46)
            }
            .padding()

            Spacer()

            ZStack {
                RoundedRectangle(cornerRadius: 36, style: .continuous)
                    .fill(LinearGradient(colors: [Theme.pink.opacity(0.4), Theme.sky.opacity(0.38), Theme.mint.opacity(0.36)], startPoint: .topLeading, endPoint: .bottomTrailing))
                    .overlay(alignment: .top) {
                        HStack(spacing: 18) {
                            Image(systemName: "sparkles")
                            Image(systemName: "scissors")
                            Image(systemName: "heart.fill")
                        }
                        .font(.title2.bold())
                        .foregroundStyle(.white.opacity(0.86))
                        .padding(.top, 18)
                    }

                SpriteArtView(sprite: store.activeSprite, effects: store.effects(for: store.activeSprite), salonEffects: effects, size: 230)
                    .gesture(
                        DragGesture(minimumDistance: 8)
                            .onChanged { _ in applySelectedTool() }
                    )
            }
            .frame(maxWidth: .infinity)
            .frame(height: 350)
            .padding(.horizontal)

            Text(selectedTool.rawValue)
                .font(.system(.title3, design: .rounded).weight(.black))

            HStack(spacing: 14) {
                ForEach(SalonTool.allCases) { tool in
                    Button {
                        selectedTool = tool
                    } label: {
                        Image(systemName: tool.symbolName)
                            .font(.system(size: 24, weight: .bold))
                            .frame(width: 64, height: 64)
                    }
                    .buttonStyle(PastelButtonStyle(color: selectedTool == tool ? Theme.lemon : Theme.sky.opacity(0.82)))
                    .accessibilityLabel(tool.rawValue)
                }
            }
            .padding(.bottom, 30)

            Spacer()
        }
        .onDisappear {
            effects = SalonEffects()
        }
    }

    private func applySelectedTool() {
        switch selectedTool {
        case .brush:
            effects.brushed = true
        case .dryer:
            effects.dried = true
        case .shampoo:
            effects.shampooed = true
            effects.showered = false
        case .shower:
            effects = SalonEffects()
            effects.showered = true
        }
    }

    private func finishAndLeave() {
        if effects.hasProgress && !didReward {
            didReward = true
            store.completeSalonSession()
        }
        effects = SalonEffects()
        store.goHome()
    }
}
