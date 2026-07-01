import Foundation

enum SpriteCatalog {
    static let flameFox = SpriteDefinition(
        id: "flame-fox",
        name: "Flame Fox",
        bodyHex: "#F2685C",
        accentHex: "#FFF5EE",
        detailHex: "#F4B947",
        personality: "Warm, brave, and bell-bright."
    )

    static let sprites: [SpriteDefinition] = {
        let generated = (2...50).map { index in
            SpriteDefinition(
                id: "sprite-\(index)",
                name: generatedName(for: index),
                bodyHex: bodyColors[(index - 2) % bodyColors.count],
                accentHex: accentColors[(index + 1) % accentColors.count],
                detailHex: detailColors[(index + 3) % detailColors.count],
                personality: personalities[(index - 2) % personalities.count]
            )
        }
        return [flameFox] + generated
    }()

    static let shopItems: [InventoryItem] = [
        InventoryItem(id: "sprite-food", name: "Sprite Food", category: .food, isConsumable: true, effect: .food),
        InventoryItem(id: "dark-cloak", name: "Dark Cloak", category: .clothing, isConsumable: false, effect: .darkCloak),
        InventoryItem(id: "light-dress", name: "Light Dress", category: .clothing, isConsumable: false, effect: .lightDress),
        InventoryItem(id: "pretty-crown", name: "Pretty Crown", category: .accessory, isConsumable: false, effect: .crown),
        InventoryItem(id: "jeweled-collar", name: "Jeweled Collar", category: .accessory, isConsumable: false, effect: .collar),
        InventoryItem(id: "golden-shrimp-caviar", name: "Golden Shrimp Caviar", category: .food, isConsumable: true, effect: .caviar)
    ]

    static func sprite(id: String) -> SpriteDefinition {
        sprites.first { $0.id == id } ?? flameFox
    }

    private static let bodyColors = ["#9AD7FF", "#FDB4C8", "#B7E4A8", "#D7C0FF", "#FFD166", "#8DEBD7", "#FF9B85", "#C2F0FC"]
    private static let accentColors = ["#FFF8D6", "#FFFFFF", "#FFE8F0", "#E9FFF2", "#F1ECFF", "#EFFFFC", "#FFF0DD"]
    private static let detailColors = ["#FF6B9A", "#6A9DFE", "#5EC487", "#A36CFF", "#F5A623", "#44C7B8", "#F07063"]
    private static let personalities = [
        "Sleepy, sweet, and soft-footed.",
        "Curious, sparkly, and snack-ready.",
        "Gentle, floaty, and fond of songs.",
        "Peppy, bright, and endlessly loyal.",
        "Shy, clever, and secretly dramatic."
    ]

    private static func generatedName(for index: Int) -> String {
        let prefixes = ["Mochi", "Cloud", "Berry", "Luna", "Puddle", "Honey", "Nova", "Peach", "Mint", "Star"]
        let species = ["Bun", "Drake", "Kit", "Puff", "Ray", "Cub", "Wisp", "Mew", "Fin", "Bloom"]
        return "\(prefixes[index % prefixes.count]) \(species[(index / prefixes.count) % species.count])"
    }
}

