import { Tabs, TabList, TabTrigger, TabSlot } from "expo-router/ui";
import { Home, Search, UserRound } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TabButton } from "@/components/navigation/TabButton";
import { TAB_BAR_GAP, TAB_BAR_MIN_BOTTOM } from "@/constants/layout";

export default function TabsLayout() {
    const { bottom } = useSafeAreaInsets();

    return (
        <Tabs>
            <TabSlot />
            <TabList
                pointerEvents="box-none"
                style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: Math.max(bottom, TAB_BAR_MIN_BOTTOM),
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: TAB_BAR_GAP,
                }}
            >
                <TabTrigger name="index" href="/" asChild>
                    <TabButton icon={Home} label="Home" />
                </TabTrigger>
                <TabTrigger name="search" href="/search" asChild>
                    <TabButton icon={Search} label="Search" />
                </TabTrigger>
                <TabTrigger name="profile" href="/profile" asChild>
                    <TabButton icon={UserRound} label="Profile" />
                </TabTrigger>
            </TabList>
        </Tabs>
    );
}