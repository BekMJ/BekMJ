import SwiftUI

@main
struct SpritesGOApp: App {
    @StateObject private var store = GameStore()

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(store)
        }
    }
}

