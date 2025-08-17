import React from 'react';
import { View, Image, StyleSheet, ViewProps, Dimensions } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

interface Props extends ViewProps {
    variant?: 'small' | 'fullscreen';
    text?: string;
    size?: number;
}

const Loader: React.FC<Props> = ({
                                     variant = 'small',
                                     text,
                                     size = 60,
                                     style,
                                     ...props
                                 }) => {
    const theme = useTheme();
    const loading_icon = require('./path/to/your/loading_icon.png');

    if (variant === 'fullscreen') {
        return (
            <View
                style={[
                    styles.fullscreenContainer,
                    {
                        backgroundColor: theme.colors.background,
                    },
                    style,
                ]}
                {...props}
            >
                <View style={styles.contentContainer}>
                    <Image
                        source={loading_icon}
                        style={styles.fullscreenImage}
                        resizeMode="contain"
                    />
                    {text && (
                        <Text
                            variant="titleLarge"
                            style={styles.text}
                        >
                            {text}
                        </Text>
                    )}
                </View>
            </View>
        );
    }

    if (variant === 'small') {
        return (
            <View
                style={[
                    styles.smallContainer,
                    {
                        height: size,
                        width: size,
                    },
                    style,
                ]}
                {...props}
            >
                <Image
                    source={loading_icon}
                    style={styles.smallImage}
                    resizeMode="contain"
                />
            </View>
        );
    }

    return null;
};

const styles = StyleSheet.create({
    fullscreenContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9,
    },
    contentContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 20,
    },
    fullscreenImage: {
        width: 60,
        height: 60,
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
    },
    smallContainer: {
        alignSelf: 'center',
    },
    smallImage: {
        width: '100%',
        height: '100%',
    },
});

export default Loader;