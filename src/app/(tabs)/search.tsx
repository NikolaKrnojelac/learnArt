
import { SafeAreaView } from "react-native-safe-area-context";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { SearchBar } from "@/features/search/components/SearchBar";
import { SearchBrowse } from "@/features/search/components/SearchBrowse";
import { RecentSearches } from "@/features/search/components/RecentSearches";
import { SearchResults } from "@/features/search/components/SearchResults";
import { useRecentSearches } from "@/features/search/store/recentSearches";
import { useRef, useState, type ComponentRef } from "react";
import { TextInput, View } from "react-native";

export default function SearchScreen() {
    const inputRef = useRef<ComponentRef<typeof TextInput>>(null);
    const [query, setQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const debouncedQuery = useDebouncedValue(query, 300);
    const addQuery = useRecentSearches((state) => state.addQuery);

    const isSearching = query.trim().length >= 2;

    const handleCancel = () => {
        setQuery("");
        inputRef.current?.blur();
    };

    return (
        <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
            <SearchBar
                inputRef={inputRef}
                value={query}
                onChangeText={setQuery}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onSubmit={() => addQuery(query)}
                onCancel={handleCancel}
                showCancel={isFocused || query.length > 0}
            />
            <View className="flex-1">
                {isSearching ? (
                    <SearchResults query={debouncedQuery} />
                ) : isFocused ? (
                    <RecentSearches onSelectQuery={setQuery} />
                ) : (
                    <SearchBrowse />
                )}
            </View>
        </SafeAreaView>
    );
}