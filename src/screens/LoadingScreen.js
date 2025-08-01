import React from 'react';
import { SafeAreaView, View, Text, Platform, useWindowDimensions, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles/common';
import { COLORS } from '../constants/theme';
import BackLayer from '../components/common/BackLayer';
import { useLoadingScreen } from '../hooks/useLoadingScreen';

let LottieComponent;
let lottieSource = require('../../assets/airplane.json');

if (Platform.OS === 'web') {
    LottieComponent = require('lottie-react').default;
} else {
    LottieComponent = require('lottie-react-native').default;
}

const LoadingScreen = ({ route, navigation }) => {
    const { myType, partnerType } = route.params;
    const { width, height } = useWindowDimensions();
    const frameWidth = Math.min(width, 500);
    const frameHeight = Math.min(height, 900);

    useLoadingScreen(myType, partnerType, navigation);

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: COLORS.background }]}>
            <LinearGradient
                colors={['#FFFCD8', '#FFEDA8', '#FFBF70']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                locations={[0, 0.5, 1]}
                style={[loadingStyles.container, { width: frameWidth, minHeight: frameHeight }]}
            >
                {/* 로딩 영역 */}
                <View style={loadingStyles.contentContainer}>
                    {Platform.OS === 'web' ? (
                        <div style={loadingStyles.webContainer}>
                            <LottieComponent
                                animationData={lottieSource}
                                autoPlay
                                loop
                                style={loadingStyles.lottieAnimation}
                            />
                        </div>
                    ) : (
                        <View style={loadingStyles.lottieContainer}>
                            <LottieComponent
                                source={lottieSource}
                                autoPlay
                                loop
                                style={loadingStyles.lottieAnimation}
                            />
                        </View>
                    )}

                    {/* 로딩 텍스트 */}
                    <Text style={loadingStyles.loadingText}>결과 분석 중...</Text>
                </View>

                {/* 하단 레이어 */}
                <BackLayer variant="result" />
            </LinearGradient>
        </SafeAreaView>
    );
};

const loadingStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    webContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    lottieContainer: {
        width: 200,
        height: 200,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lottieAnimation: {
        width: 200,
        height: 200,
        backgroundColor: 'transparent',
    },
    loadingText: {
        fontFamily: 'NanumSquareRound',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#6E3209',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default LoadingScreen; 