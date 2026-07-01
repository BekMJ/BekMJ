import SwiftUI

#if os(iOS)
import ARKit
import RealityKit
import UIKit
#endif

struct ARCameraView: View {
    @EnvironmentObject private var store: GameStore

    var body: some View {
        ZStack(alignment: .topLeading) {
            #if os(iOS)
            if ARWorldTrackingConfiguration.isSupported {
                ARSpriteContainer(sprite: store.activeSprite)
                    .ignoresSafeArea()
            } else {
                arFallback
            }
            #else
            arFallback
            #endif

            CloseButton { store.goHome() }
                .padding()
        }
    }

    private var arFallback: some View {
        ZStack {
            LinearGradient(colors: [Theme.sky.opacity(0.75), Theme.mint.opacity(0.55)], startPoint: .top, endPoint: .bottom)
                .ignoresSafeArea()
            VStack(spacing: 18) {
                SpriteArtView(sprite: store.activeSprite, effects: store.effects(for: store.activeSprite), size: 230)
                Text("AR preview")
                    .font(.system(.largeTitle, design: .rounded).weight(.black))
                Text("Run on an ARKit-capable iPhone to place your sprite on real tables, floors, and desks.")
                    .font(.headline)
                    .multilineTextAlignment(.center)
                    .padding(.horizontal)
            }
        }
    }
}

#if os(iOS)
struct ARSpriteContainer: UIViewRepresentable {
    let sprite: SpriteDefinition

    func makeUIView(context: Context) -> ARView {
        let arView = ARView(frame: .zero)
        let configuration = ARWorldTrackingConfiguration()
        configuration.planeDetection = [.horizontal]
        configuration.environmentTexturing = .automatic
        arView.session.run(configuration)

        let anchor = AnchorEntity(plane: .horizontal, minimumBounds: [0.18, 0.18])
        let entity = makeSpriteEntity()
        anchor.addChild(entity)
        arView.scene.addAnchor(anchor)
        return arView
    }

    func updateUIView(_ uiView: ARView, context: Context) {}

    private func makeSpriteEntity() -> Entity {
        let root = Entity()
        let body = ModelEntity(
            mesh: .generateSphere(radius: 0.09),
            materials: [SimpleMaterial(color: UIColor(Color(hex: sprite.bodyHex)), roughness: 0.45, isMetallic: false)]
        )
        body.position.y = 0.1

        let belly = ModelEntity(
            mesh: .generateSphere(radius: 0.045),
            materials: [SimpleMaterial(color: UIColor(Color(hex: sprite.accentHex)), roughness: 0.5, isMetallic: false)]
        )
        belly.position = [0, 0.07, 0.075]

        let shadow = ModelEntity(
            mesh: .generateCylinder(height: 0.002, radius: 0.12),
            materials: [SimpleMaterial(color: UIColor.black.withAlphaComponent(0.18), roughness: 1, isMetallic: false)]
        )
        shadow.position.y = 0.002

        root.addChild(shadow)
        root.addChild(body)
        root.addChild(belly)
        return root
    }
}
#endif
