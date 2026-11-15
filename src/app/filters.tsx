import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { router } from "expo-router";
import { RangeSlider } from "@react-native-assets/slider";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pill } from "@/components/ui/Pill";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { HeaderSection } from "@/components/ui/SectionHeader";
import { LoadingState } from "@/components/feedback/LoadingState";
import { CATEGORIES, ALL_CATEGORY_ID } from "@/features/artworks/constants/categories";
import { formatYear } from "@/features/artworks/utils/year";
import { YearField } from "@/features/filters/components/YearField";
import { useArtworkCount } from "@/features/filters/hooks/useArtworkCount";
import { useFilterOptions } from "@/features/filters/hooks/useFilterOptions";
import { useArtworkFilters } from "@/features/filters/store/artworkFilters";
import type { YearRange } from "@/features/filters/types";
import { colors } from "@/theme/colors";

export default function FiltersScreen() {
    const storedCategory = useArtworkFilters((s) => s.categoryId);
    const storedRegions = useArtworkFilters((s) => s.regions);
    const storedRange = useArtworkFilters((s) => s.yearRange);
    const applyFilters = useArtworkFilters((s) => s.apply);

    const { data: options } = useFilterOptions();

    const [categoryId, setCategoryId] = useState(storedCategory);
    const [regions, setRegions] = useState(storedRegions);
    const [range, setRange] = useState<YearRange | null>(storedRange);

    const bounds = options?.yearBounds;
    const shownRange: YearRange = range ?? bounds ?? [0, 0];


    const effectiveRange: YearRange | null =
        range && bounds && range[0] === bounds[0] && range[1] === bounds[1]
            ? null
            : range;

    const query = useMemo(
        () => ({
            artworkType:
                CATEGORIES.find((c) => c.id === categoryId)?.artworkType ?? null,
            regions,
            yearRange: effectiveRange,
        }),
        [categoryId, regions, effectiveRange]
    );
    const { data: count } = useArtworkCount(query);

    const toggleRegion = (name: string) =>
        setRegions((current) =>
            current.includes(name)
                ? current.filter((region) => region !== name)
                : [...current, name]
        );

    const handleFromChange = (year: number) => {
        if (!bounds) return;
        const to = shownRange[1];
        if (year >= bounds[0] && year < to) setRange([year, to]);
    };

    const handleToChange = (year: number) => {
        if (!bounds) return;
        const from = shownRange[0];
        if (year <= bounds[1] && year > from) setRange([from, year]);
    };

    const handleReset = () => {
        setCategoryId(ALL_CATEGORY_ID);
        setRegions([]);
        setRange(null);
    };

    const handleApply = () => {
        applyFilters({ categoryId, regions, yearRange: effectiveRange });
        router.back();
    };

    const applyLabel =
        count === undefined
            ? "Apply Filters"
            : count === 0
                ? "No artworks match"
                : `Apply Filters (${count} ${count === 1 ? "Artwork" : "Artworks"})`;

    return (
        <SafeAreaView className="flex-1 bg-background" edges={["top", "bottom"]}>
            <View className="flex-row items-center px-4 pb-2 pt-5">
                <View className="w-16" />
                <Text className="flex-1 text-center text-xl font-semibold tracking-wide text-primary">
                    Filters
                </Text>
                <Pressable
                    onPress={handleReset}
                    hitSlop={8}
                    accessibilityRole="button"
                    className="w-16 items-end"
                >
                    <Text className="text-base text-primary/60">Reset</Text>
                </Pressable>
            </View>

            {!options || !bounds ? (
                <LoadingState />
            ) : (
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode="on-drag"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 24 }}
                >
                    <HeaderSection title="Category" />
                    <View className="flex-row flex-wrap gap-2.5 px-4">
                        {CATEGORIES.map((category) => (
                            <Pill
                                key={category.id}
                                shape="soft"
                                label={category.label}
                                selected={category.id === categoryId}
                                onPress={() => setCategoryId(category.id)}
                            />
                        ))}
                    </View>

                    {options.regions.length > 0 ? (
                        <>
                            <HeaderSection title="Culture" />
                            <View className="flex-row flex-wrap gap-2.5 px-4">
                                {options.regions.map((region) => (
                                    <Pill
                                        key={region.name}
                                        shape="soft"
                                        label={region.name}
                                        selected={regions.includes(region.name)}
                                        onPress={() => toggleRegion(region.name)}
                                    />
                                ))}
                            </View>
                        </>
                    ) : null}

                    <HeaderSection title="Time Period" />
                    <View className="flex-row gap-3 px-4">
                        <YearField label="From" value={shownRange[0]} onChange={handleFromChange} />
                        <YearField label="To" value={shownRange[1]} onChange={handleToChange} />
                    </View>
                    <View className="px-8 pt-4">
                        <RangeSlider
                            range={shownRange}
                            minimumValue={bounds[0]}
                            maximumValue={bounds[1]}
                            step={1}
                            minimumRange={1}
                            trackHeight={3}
                            thumbSize={26}
                            inboundColor={colors.primary}
                            outboundColor={colors.muted}
                            thumbTintColor={colors.surface}
                            thumbStyle={{ borderWidth: 1, borderColor: colors.primary }}
                            onValueChange={(value) => setRange([value[0], value[1]])}
                        />
                    </View>
                </ScrollView>
            )}

            <View className="px-4 pb-2 pt-2">
                <PrimaryButton
                    label={applyLabel}
                    disabled={count === 0}
                    onPress={handleApply}
                />
            </View>
        </SafeAreaView>
    );
}