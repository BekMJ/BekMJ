import SwiftUI

struct SettingsView: View {
    @EnvironmentObject private var store: GameStore
    @State private var settings = AppSettings()

    var body: some View {
        VStack {
            HStack {
                CloseButton { store.goHome() }
                Spacer()
            }
            .padding()

            HStack(alignment: .top, spacing: 18) {
                VStack(spacing: 18) {
                    sectionTitle("CREATORS")
                    creatorCard(name: "Joseph", role: "Game Director", description: "Shapes the cozy creature loop and player experience.")
                    creatorCard(name: "Codex", role: "SwiftUI Builder", description: "Builds the scaffold, screens, and playful prototype logic.")
                }
                .frame(maxWidth: .infinity)

                VStack(spacing: 18) {
                    sectionTitle("SETTINGS")
                    picker("Volume", selection: $settings.volume)
                    picker("Language", selection: $settings.language)
                    picker("Brightness", selection: $settings.brightness)
                }
                .frame(maxWidth: .infinity)
            }
            .padding(.horizontal)

            Spacer()
        }
        .onAppear { settings = store.state.settings }
        .onChange(of: settings) { _, newValue in
            store.updateSettings(newValue)
        }
    }

    private func sectionTitle(_ text: String) -> some View {
        Text(text)
            .font(.system(.title2, design: .rounded).weight(.black))
            .frame(maxWidth: .infinity)
    }

    private func creatorCard(name: String, role: String, description: String) -> some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(name).font(.system(.headline, design: .rounded).weight(.black))
            Text(role).font(.system(.subheadline, design: .rounded).weight(.bold)).foregroundStyle(Theme.coral)
            Text(description).font(.system(.footnote, design: .rounded))
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(14)
        .background(RoundedRectangle(cornerRadius: 18, style: .continuous).fill(.white.opacity(0.64)))
    }

    private func picker<Value: CaseIterable & Identifiable & RawRepresentable>(_ title: String, selection: Binding<Value>) -> some View where Value.RawValue == String, Value.AllCases: RandomAccessCollection {
        VStack(alignment: .leading, spacing: 8) {
            Text(title).font(.system(.headline, design: .rounded).weight(.bold))
            Picker(title, selection: selection) {
                ForEach(Value.allCases) { value in
                    Text(value.rawValue).tag(value)
                }
            }
            .pickerStyle(.menu)
            .frame(maxWidth: .infinity, alignment: .leading)
            .padding(12)
            .background(RoundedRectangle(cornerRadius: 16, style: .continuous).fill(.white.opacity(0.7)))
        }
    }
}

