import { ScrollView, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useLocalSearchParams } from "expo-router";
import { Lightbulb } from "lucide-react-native";
import { BackButton } from "@/components/ui/BackButton";
import { CalloutCard } from "@/components/ui/CalloutCard";
import { InfoSection } from "@/components/ui/InfoSection";
import { LoadingState } from "@/components/feedback/LoadingState";
import { ErrorState } from "@/components/feedback/ErrorState";
import { ArtworkHero } from "@/features/artworks/componentes/ArtworkHero";
import { FactGrid } from "@/features/artworks/componentes/FactGrid";
import { MuseumCredit } from "@/features/artworks/componentes/MuseumCredit";
import { useArtwork } from "@/features/artworks/hooks/useArtwork";

export default function ArtworkDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { data: artwork, isLoading, isError, refetch } = useArtwork(Number(id));

    if (isLoading) return <LoadingState />;
    if (isError || !artwork) return <ErrorState onRetry={refetch} />;

    return (
        <View className="flex-1 bg-background">
            <StatusBar style="light" />
            <ScrollView
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
            </ScrollView>
            <BackButton />
        </View>
    );
}