import SwiftUI

struct SpriteArtView: View {
    let sprite: SpriteDefinition
    var effects: Set<ItemEffect> = []
    var salonEffects = SalonEffects()
    var size: CGFloat = 180

    @State private var bob = false

    var body: some View {
        ZStack {
            shadow
            bodyShape
            ears
            face
            tail
            cosmetics
            salonOverlay
        }
        .frame(width: size, height: size)
        .offset(y: bob ? -6 : 4)
        .animation(.easeInOut(duration: 1.4).repeatForever(autoreverses: true), value: bob)
        .onAppear { bob = true }
    }

    private var baseColor: Color {
        let color = Color(hex: sprite.bodyHex)
        return effects.contains(.darkCloak) ? color.opacity(0.62) : color
    }

    private var accentColor: Color {
        effects.contains(.darkCloak) ? Color(hex: "#6E6074") : Color(hex: sprite.accentHex)
    }

    private var shadow: some View {
        Ellipse()
            .fill(.black.opacity(0.12))
            .frame(width: size * 0.72, height: size * 0.13)
            .offset(y: size * 0.38)
    }

    private var bodyShape: some View {
        ZStack {
            Circle()
                .fill(baseColor)
                .frame(width: size * 0.68, height: size * 0.68)
            Circle()
                .fill(accentColor)
                .frame(width: size * 0.36, height: size * 0.28)
                .offset(y: size * 0.14)
        }
    }

    private var ears: some View {
        ZStack {
            Triangle()
                .fill(baseColor)
                .frame(width: size * 0.28, height: size * 0.28)
                .rotationEffect(.degrees(-24))
                .offset(x: -size * 0.22, y: -size * 0.31)
            Triangle()
                .fill(baseColor)
                .frame(width: size * 0.28, height: size * 0.28)
                .rotationEffect(.degrees(24))
                .offset(x: size * 0.22, y: -size * 0.31)
            if sprite.id == "flame-fox" {
                Circle().fill(Color(hex: sprite.detailHex)).frame(width: size * 0.08).offset(x: -size * 0.34, y: -size * 0.18)
                Circle().fill(Color(hex: sprite.detailHex)).frame(width: size * 0.08).offset(x: size * 0.34, y: -size * 0.18)
            }
        }
    }

    private var face: some View {
        ZStack {
            Circle().fill(.black.opacity(0.82)).frame(width: size * 0.07).offset(x: -size * 0.13, y: -size * 0.02)
            Circle().fill(.black.opacity(0.82)).frame(width: size * 0.07).offset(x: size * 0.13, y: -size * 0.02)
            Capsule().fill(Color(hex: "#584657")).frame(width: size * 0.08, height: size * 0.045).offset(y: size * 0.08)
            Circle().fill(.white.opacity(0.9)).frame(width: size * 0.025).offset(x: -size * 0.145, y: -size * 0.035)
            Circle().fill(.white.opacity(0.9)).frame(width: size * 0.025).offset(x: size * 0.105, y: -size * 0.035)
        }
    }

    private var tail: some View {
        Capsule()
            .fill(baseColor)
            .frame(width: size * 0.22, height: size * 0.62)
            .rotationEffect(.degrees(-38))
            .offset(x: size * 0.37, y: size * 0.08)
    }

    @ViewBuilder
    private var cosmetics: some View {
        if effects.contains(.lightDress) {
            Capsule()
                .fill(Color(hex: "#FFF8D6"))
                .frame(width: size * 0.5, height: size * 0.18)
                .offset(y: size * 0.22)
        }
        if effects.contains(.crown) {
            CrownShape()
                .fill(Color(hex: "#FFD166"))
                .frame(width: size * 0.32, height: size * 0.18)
                .offset(y: -size * 0.42)
        }
        if effects.contains(.collar) {
            Capsule()
                .stroke(Color(hex: "#63D2FF"), lineWidth: max(4, size * 0.03))
                .frame(width: size * 0.44, height: size * 0.12)
                .offset(y: size * 0.18)
        }
        if effects.contains(.darkCloak) {
            Capsule()
                .fill(Color(hex: "#3D314A").opacity(0.35))
                .frame(width: size * 0.62, height: size * 0.36)
                .offset(y: size * 0.19)
        }
    }

    @ViewBuilder
    private var salonOverlay: some View {
        if salonEffects.shampooed {
            BubbleCluster(size: size)
        }
        if salonEffects.dried {
            Image(systemName: "wind")
                .font(.system(size: size * 0.22, weight: .bold))
                .foregroundStyle(Theme.sky)
                .offset(x: -size * 0.42, y: -size * 0.08)
        }
        if salonEffects.brushed {
            Image(systemName: "sparkles")
                .font(.system(size: size * 0.2, weight: .bold))
                .foregroundStyle(Theme.lemon)
                .offset(x: size * 0.35, y: -size * 0.16)
        }
    }
}

private struct BubbleCluster: View {
    let size: CGFloat

    var body: some View {
        ZStack {
            ForEach(0..<8, id: \.self) { index in
                Circle()
                    .stroke(.white.opacity(0.9), lineWidth: 3)
                    .background(Circle().fill(Theme.sky.opacity(0.18)))
                    .frame(width: size * CGFloat([0.1, 0.08, 0.12, 0.07][index % 4]))
                    .offset(x: xOffset(index), y: yOffset(index))
            }
        }
    }

    private func xOffset(_ index: Int) -> CGFloat {
        [-0.24, 0.25, -0.1, 0.12, -0.32, 0.32, -0.02, 0.22][index] * size
    }

    private func yOffset(_ index: Int) -> CGFloat {
        [0.12, 0.14, 0.28, 0.25, -0.02, 0.0, 0.34, 0.31][index] * size
    }
}

private struct Triangle: Shape {
    func path(in rect: CGRect) -> Path {
        var path = Path()
        path.move(to: CGPoint(x: rect.midX, y: rect.minY))
        path.addLine(to: CGPoint(x: rect.maxX, y: rect.maxY))
        path.addLine(to: CGPoint(x: rect.minX, y: rect.maxY))
        path.closeSubpath()
        return path
    }
}

private struct CrownShape: Shape {
    func path(in rect: CGRect) -> Path {
        var path = Path()
        path.move(to: CGPoint(x: rect.minX, y: rect.maxY))
        path.addLine(to: CGPoint(x: rect.minX, y: rect.midY))
        path.addLine(to: CGPoint(x: rect.width * 0.25, y: rect.minY))
        path.addLine(to: CGPoint(x: rect.midX, y: rect.midY))
        path.addLine(to: CGPoint(x: rect.width * 0.75, y: rect.minY))
        path.addLine(to: CGPoint(x: rect.maxX, y: rect.midY))
        path.addLine(to: CGPoint(x: rect.maxX, y: rect.maxY))
        path.closeSubpath()
        return path
    }
}

