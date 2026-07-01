import SwiftUI

enum Theme {
    static let pink = Color(hex: "#FDB4C8")
    static let sky = Color(hex: "#9AD7FF")
    static let mint = Color(hex: "#B7E4A8")
    static let lemon = Color(hex: "#FFF1A8")
    static let coral = Color(hex: "#FF8A7A")
    static let ink = Color(hex: "#4E4559")
    static let cream = Color(hex: "#FFF9F2")

    static let roundedFont = Font.system(.body, design: .rounded)
    static let titleFont = Font.system(size: 46, weight: .black, design: .rounded)

    static var background: LinearGradient {
        LinearGradient(
            colors: [Color(hex: "#FFF4F8"), Color(hex: "#E8FAFF"), Color(hex: "#F6FFE8")],
            startPoint: .topLeading,
            endPoint: .bottomTrailing
        )
    }
}

extension Color {
    init(hex: String) {
        let scanner = Scanner(string: hex.replacingOccurrences(of: "#", with: ""))
        var value: UInt64 = 0
        scanner.scanHexInt64(&value)
        let red = Double((value >> 16) & 0xFF) / 255
        let green = Double((value >> 8) & 0xFF) / 255
        let blue = Double(value & 0xFF) / 255
        self.init(red: red, green: green, blue: blue)
    }
}

struct PastelButtonStyle: ButtonStyle {
    var color: Color = Theme.pink

    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.system(.headline, design: .rounded).weight(.bold))
            .foregroundStyle(Theme.ink)
            .padding(.horizontal, 18)
            .padding(.vertical, 14)
            .background(
                RoundedRectangle(cornerRadius: 24, style: .continuous)
                    .fill(color)
                    .shadow(color: color.opacity(configuration.isPressed ? 0.15 : 0.35), radius: configuration.isPressed ? 3 : 10, y: 6)
            )
            .scaleEffect(configuration.isPressed ? 0.96 : 1)
            .animation(.spring(response: 0.25, dampingFraction: 0.7), value: configuration.isPressed)
    }
}

struct CloseButton: View {
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            Image(systemName: "xmark")
                .font(.system(size: 18, weight: .black, design: .rounded))
                .foregroundStyle(.white)
                .frame(width: 46, height: 46)
                .background(Circle().fill(Color.red.opacity(0.82)))
        }
        .accessibilityLabel("Close")
    }
}

