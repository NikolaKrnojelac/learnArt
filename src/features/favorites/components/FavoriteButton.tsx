import { Pressable } from "react-native";
import { Bookmark } from "lucide-react-native";
import { colors } from "@/theme/colors";
import { useFavorites } from "../store/favorites";

type FavoriteButtonProps = { artworkId: number };

export function FavoriteButton({ artworkId }: FavoriteButtonProps) {
    const isFavorite = useFavorites((state) => state.ids.includes(artworkId));
    const toggle = useFavorites((state) => state.toggle);

    return (
        <Pressable
            onPress={() => toggle(artworkId)}
            accessibilityRole="button"
            accessibilityLabel={isFavorite ? "Remove from saved" : "Save artwork"}
            accessibilityState={{ selected: isFavorite }}
            hitSlop={8}
            className="h-11 w-11 items-center justify-center rounded-full bg-background/80"
        >
            <Bookmark
                size={22}
                color={colors.primary}
                strokeWidth={1.75}
                fill={isFavorite ? colors.primary : "none"}
            />
        </Pressable>
    );
}