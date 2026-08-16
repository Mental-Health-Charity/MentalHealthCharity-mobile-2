import {
    FlatList,
    Image,
    Pressable,
    RefreshControl,
    Text,
    View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Loader from "@/modules/shared/components/Loader";
import { Chat } from "@/modules/chat/types";
import { useChatList } from "@/modules/chat/hooks/useChatList";
import { useTranslation } from "react-i18next";

const formatLastMessageDate = (date?: string) => {
    if (!date) {
        return "";
    }

    return new Intl.DateTimeFormat("pl-PL", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(date));
};

const getLastMessagePreview = (chat: Chat, fallback: string) => {
    if (!chat.last_message?.content) {
        return fallback;
    }

    return chat.last_message.content;
};

const getChatAvatar = (chat: Chat) => {
    return chat.participants.find((participant) => participant.chat_avatar_url)
        ?.chat_avatar_url;
};

const ChatListScreen = () => {
    const { t } = useTranslation();
    const {
        canManageChats,
        chats,
        error,
        handleDeleteChat,
        handleOpenChat,
        isDeletingChat,
        isLoading,
        isRefetching,
        isWaitingForAssignment,
        refetch,
    } = useChatList();

    const renderChat = ({ item }: { item: Chat }) => {
        const avatar = getChatAvatar(item);

        return (
            <Pressable
                onPress={() => handleOpenChat(item.id)}
                className="mx-4 mb-3 flex-row items-center gap-3 rounded-lg border border-slate-100 bg-white p-4 shadow-sm active:bg-slate-50"
            >
                <View className="h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-primary/10">
                    {avatar ? (
                        <Image
                            source={{ uri: avatar }}
                            className="h-full w-full"
                            resizeMode="cover"
                        />
                    ) : (
                        <Ionicons
                            name="person-outline"
                            size={25}
                            color="#06B7A7"
                        />
                    )}
                </View>

                <View className="min-w-0 flex-1">
                    <View className="mb-1 flex-row items-start justify-between gap-3">
                        <Text
                            className="flex-1 text-base font-semibold text-slate-950"
                            numberOfLines={1}
                        >
                            {item.name}
                        </Text>
                        <Text className="text-xs text-slate-500">
                            {formatLastMessageDate(
                                item.last_message?.creation_date,
                            )}
                        </Text>
                    </View>

                    <Text
                        className="text-sm leading-5 text-slate-600"
                        numberOfLines={2}
                    >
                        {getLastMessagePreview(
                            item,
                            t("chat_list.no_messages"),
                        )}
                    </Text>
                </View>

                <View className="items-end gap-3">
                    {item.unread_count > 0 ? (
                        <View className="min-h-6 min-w-6 items-center justify-center rounded-full bg-primary px-2">
                            <Text className="text-xs font-bold text-white">
                                {item.unread_count > 99
                                    ? "99+"
                                    : item.unread_count}
                            </Text>
                        </View>
                    ) : null}

                    {canManageChats ? (
                        <Pressable
                            disabled={isDeletingChat}
                            onPress={(event) => {
                                event.stopPropagation();
                                handleDeleteChat(item.id);
                            }}
                            className="h-9 w-9 items-center justify-center rounded-full bg-red-50 active:bg-red-100"
                            accessibilityRole="button"
                            accessibilityLabel={t(
                                "chat_list.delete_accessibility_label",
                                { name: item.name },
                            )}
                        >
                            <Ionicons
                                name="trash-outline"
                                size={18}
                                color="#FF3D47"
                            />
                        </Pressable>
                    ) : null}
                </View>
            </Pressable>
        );
    };

    if (isLoading) {
        return (
            <View className="flex-1 items-center justify-center bg-slate-50 px-6">
                <Loader />
                <Text className="mt-4 text-center text-base text-slate-600">
                    {t("chat_list.loading")}
                </Text>
            </View>
        );
    }

    if (error) {
        return (
            <View className="flex-1 items-center justify-center bg-slate-50 px-6">
                <Ionicons
                    name="chatbubble-ellipses-outline"
                    size={42}
                    color="#FF3D47"
                />
                <Text className="mt-4 text-center text-lg font-semibold text-slate-950">
                    {t("chat_list.fetch_error_title")}
                </Text>
                <Text className="mt-2 text-center text-sm leading-5 text-slate-600">
                    {t("chat_list.fetch_error_description")}
                </Text>
            </View>
        );
    }

    if (isWaitingForAssignment) {
        return (
            <View className="flex-1 items-center justify-center bg-slate-50 px-6">
                <Ionicons
                    name="chatbubble-ellipses-outline"
                    size={44}
                    color="#06B7A7"
                />
                <Text className="mt-4 text-center text-lg font-semibold text-slate-950">
                    {t("chat_list.waiting_title")}
                </Text>
                <Text className="mt-2 text-center text-sm leading-5 text-slate-600">
                    {t("chat_list.waiting_description")}
                </Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-slate-50">
            <View className="px-4 pb-3 pt-12">
                <Text className="text-2xl font-bold text-slate-950">
                    {t("navigation.chats")}
                </Text>
            </View>

            <FlatList
                data={chats}
                keyExtractor={(item) => String(item.id)}
                renderItem={renderChat}
                contentContainerClassName="pb-6"
                ListEmptyComponent={
                    <View className="items-center px-6 py-12">
                        <Ionicons
                            name="chatbubble-ellipses-outline"
                            size={42}
                            color="#94A3B8"
                        />
                        <Text className="mt-4 text-center text-base font-semibold text-slate-900">
                            {t("chat_list.empty")}
                        </Text>
                    </View>
                }
                refreshControl={
                    <RefreshControl
                        refreshing={isRefetching}
                        onRefresh={refetch}
                    />
                }
            />
        </View>
    );
};

export default ChatListScreen;
