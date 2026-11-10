import { View } from "react-native";
import { ImageTile } from "@/components/ui/ImageTile";
import type { BrowseTile } from "../types";

type TileGridProps = {
    tiles: BrowseTile[];
    onTilePress?: (tile: BrowseTile) => void;
};

function chunk<T>(items: T[], size: number): T[][] {
    const rows: T[][] = [];
    for (let i = 0; i < items.length; i += size) rows.push(items.slice(i, i + size));
    return rows;
}

export function TileGrid({ tiles, onTilePress }: TileGridProps) {
    return (
        <View className="gap-3">
            {chunk(tiles, 2).map((row) => (
                <View key={row[0].id} className="flex-row gap-3">
                    {row.map((tile) => (
                        <View key={tile.id} className="flex-1">
                            <ImageTile
                                label={tile.label}
                                imageUrl={tile.imageUrl}
                                onPress={() => onTilePress?.(tile)}
                            />
                        </View>
                    ))}
                    {row.length === 1 ? <View className="flex-1" /> : null}
                </View>
            ))}
        </View>
    );
}