import { ScrollView, View } from "react-native";
import CustomButton from "@/modules/shared/components/Button";
import { ArticleStatusOption } from "@/modules/articles/types";
import { ArticleStatus } from "@/modules/articles/constants";

type Props = {
    statuses: ArticleStatusOption[];
    selectedStatus: ArticleStatus;
    onChange: (status: ArticleStatus) => void;
};

const ArticleStatusesList = ({ statuses, selectedStatus, onChange }: Props) => {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 4 }}
        >
            {statuses.map((item) => (
                <View key={item.key} className="mr-2">
                    <CustomButton
                        title={item.title}
                        onPress={() => onChange(item.key)}
                        variant={
                            selectedStatus === item.key
                                ? "primary"
                                : "secondary"
                        }
                    />
                </View>
            ))}
        </ScrollView>
    );
};

export default ArticleStatusesList;
