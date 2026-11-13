import { useMemo, useRef, useState } from "react";
import {
    Animated,
    type NativeScrollEvent,
    type NativeSyntheticEvent,
    View,
    useWindowDimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Lightbulb } from "lucide-react-native";
import { CalloutCard } from "@/components/ui/CalloutCard";
import { InfoSection } from "@/components/ui/InfoSection";
import { LoadingState } from "@/components/feedback/LoadingState";
import { ErrorState } from "@/components/feedback/ErrorState";
import { ArtworkHeader } from "@/features/artworks/components/ArtworkHeader";
import { ArtworkHero } from "@/features/artworks/components/ArtworkHero";
import { FactGrid } from "@/features/artworks/components/FactGrid";
import { MuseumCredit } from "@/features/artworks/components/MuseumCredit";
import { useArtwork } from "@/features/artworks/hooks/useArtwork";
import {
    DETAIL_HEADER_CONTENT_HEIGHT,
    HERO_ASPECT_RATIO,
} from "@/constants/layout";

const FADE_DISTANCE = 80;

export default function ArtworkDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { data: artwork, isLoading, isError, refetch } = useArtwork(Number(id));

    const { width } = useWindowDimensions();
    const { top } = useSafeAreaInsets();
    const scrollY = useRef(new Animated.Value(0)).current;
    const [collapsed, setCollapsed] = useState(false);

    const heroHeight = width / HERO_ASPECT_RATIO;
    const collapseEnd = heroHeight - (top + DETAIL_HEADER_CONTENT_HEIGHT);
    const collapseStart = collapseEnd - FADE_DISTANCE;

    const handleScroll = useMemo(
        () =>
            Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
                useNativeDriver: true,
                listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
                    setCollapsed(event.nativeEvent.contentOffset.y > collapseEnd - 40);
                },
            }),
        [scrollY, collapseEnd]
    );

    if (isLoading) return <LoadingState />;
    if (isError || !artwork) return <ErrorState onRetry={refetch} />;

    return (
        <View className="flex-1 bg-background">
            <StatusBar style={collapsed ? "dark" : "light"} />
            <Animated.ScrollView
                onScroll={handleScroll}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 48 }}
            >
                <ArtworkHero
                    imageUrl={artwork.imageUrl}
                    title={artwork.title}
                    artist={artwork.artist}
                />
                <FactGrid
                    facts={[
                        { label: "Year", value: artwork.dateDisplay },
                        { label: "Medium", value: artwork.medium },
                        { label: "Dimensions", value: artwork.dimensions },
                        { label: "Culture", value: artwork.culture },
                    ]}
                />
                {artwork.description ? (
                    <InfoSection title="About this work" body={artwork.description} />
                ) : null}
                {artwork.didYouKnow ? (
                    <CalloutCard
                        icon={Lightbulb}
                        label="Did you know"
                        text={artwork.didYouKnow}
                    />
                ) : null}
                {artwork.artistBio ? (
                    <View className="mt-8">
                        <InfoSection title="About the artist" body={artwork.artistBio} />
                    </View>
                ) : null}
                <MuseumCredit
                    creditLine={artwork.creditLine}
                    sourceUrl={artwork.sourceUrl}
                />
            </Animated.ScrollView>
            <ArtworkHeader
                title={artwork.title}
                artworkId={artwork.id}
                scrollY={scrollY}
                collapseStart={collapseStart}
                collapseEnd={collapseEnd}
            />
        </View>
    );
}