import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Defs, ClipPath, Image as SvgImage } from 'react-native-svg';

const { width, height } = Dimensions.get('window'); // Dimensiones de la pantalla

export default function RoundedImageBackground() {
    return (
        <View style={styles.container}>
            <Svg
                width={width}
                height={height * 0.6} // Ocupa el 60% de la altura de la pantalla
                viewBox={`0 0 ${width} ${height * 0.6}`}
            >
                <Defs>
                    <ClipPath id="clip">
                        <Path
                            d={`M0,0 L${width},0 L${width},${height * 0.5} Q${width / 2},${height *
                                0.6} 0,${height * 0.5} Z`}
                        />
                    </ClipPath>
                </Defs>
                <SvgImage
                    href={require('../assets/vacation.png')}
                    width={width}
                    height={height * 0.6}
                    preserveAspectRatio="xMidYMid slice"
                    clipPath="url(#clip)"
                />
            </Svg>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: height * 0.6,
    },
});
