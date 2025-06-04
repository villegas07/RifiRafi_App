import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import FloatingMenuBar from '../components/FloatingMenuBar';
import BackgroundTop from '../components/BackgroundTop';
import ProfileButton from '../components/ProfileButton';

const { width } = Dimensions.get('window');

const mockData = [
    { name: 'Brayan Villegas', time: '00:42:18', image: require('../assets/Vacaciones.jpg') },
    { name: 'Daniela Pérez', time: '00:45:23', image: require('../assets/Vacaciones.jpg') },
    { name: 'Luis Gómez', time: '00:50:12', image: require('../assets/Vacaciones.jpg') },
    { name: 'Andrea Martínez', time: '00:52:45', image: require('../assets/Vacaciones.jpg') },
    { name: 'Carlos López', time: '00:55:10', image: require('../assets/Vacaciones.jpg') },
    { name: 'Ana Montes', time: '00:55:10', image: require('../assets/Vacaciones.jpg') },
    { name: 'Juan López', time: '00:55:10', image: require('../assets/Vacaciones.jpg') },
    { name: 'Sandra López', time: '00:55:10', image: require('../assets/Vacaciones.jpg') },
    { name: 'Jorge López', time: '00:55:10', image: require('../assets/Vacaciones.jpg') },
    { name: 'Luis Montes', time: '00:55:10', image: require('../assets/Vacaciones.jpg') },
    { name: 'Carlos López', time: '00:55:10', image: require('../assets/Vacaciones.jpg') },
];

const menuItems = [
    { screen: 'Ideas', icon: require('../assets/test.png'), iconType: 'image', color: '#4CAF50' },
    { screen: 'Messages', icon: require('../assets/chat.png'), iconType: 'image', color: '#FFC107' },
    { screen: 'Home', icon: require('../assets/home.png'), iconType: 'image', color: '#03A9F4' },
    { screen: 'Brain', icon: require('../assets/gym.png'), iconType: 'image', color: '#9C27B0' },
    { screen: 'Favorites', icon: require('../assets/historia.png'), iconType: 'image', color: '#E91E63' },
];

export default function TopScreen({ navigation }) {
    const topThree = mockData.slice(0, 3);
    const remainingList = mockData.slice(3);

    return (
        <View style={styles.container}>
            {/* Fondo */}
            <BackgroundTop />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Image source={require('../assets/test.png')} style={styles.headerIcon} />
                    <Text style={styles.headerText}>Top</Text>
                </View>
                <ProfileButton
                    imageSource={require('../assets/Vacaciones.jpg')}
                    onPress={() => navigation.navigate('UserProfileScreen')}
                    style={styles.profileButton} // Estilo específico para esta screen
                />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Podio */}
                <View style={styles.podiumContainer}>
                    <View style={styles.secondPlace}>
                        <Image source={topThree[1].image} style={styles.podiumImage} />
                        <Text style={styles.podiumName}>{topThree[1].name}</Text>
                        <Image source={require('../assets/2.png')} style={styles.podiumTrophy} />
                        <Text style={styles.positionTime}>{topThree[1].time}</Text>
                    </View>
                    <View style={styles.firstPlace}>
                        <Image source={topThree[0].image} style={styles.podiumImage} />
                        <Text style={styles.podiumName}>{topThree[0].name}</Text>
                        <Image source={require('../assets/trofeo.png')} style={styles.podiumTrophy} />
                        <Text style={styles.positionTime}>{topThree[0].time}</Text>
                    </View>
                    <View style={styles.thirdPlace}>
                        <Image source={topThree[2].image} style={styles.podiumImage} />
                        <Text style={styles.podiumName}>{topThree[2].name}</Text>
                        <Image source={require('../assets/3.png')} style={styles.podiumTrophy} />
                        <Text style={styles.positionTime}>{topThree[2].time}</Text>
                    </View>
                </View>

                {/* Lista de posiciones restantes */}
                <View style={styles.listContainer}>
                    {remainingList.map((item, index) => (
                        <View key={index} style={styles.listItem}>
                            <Text style={styles.listPosition}>{index + 4}</Text>
                            <Image source={item.image} style={styles.listImage} />
                            <Text style={styles.listText}>{item.name}</Text>
                            <Text style={styles.listTime}>{item.time}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>

            {/* Menú flotante */}
            <View style={styles.menuContainer}>
                <FloatingMenuBar menuItems={menuItems} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        top: 17,
        marginLeft: 95,
    },
    headerIcon: {
        width: 70,
        height: 70,
        marginRight: 10,
    },
    headerText: {
        fontSize: 24,
        color: '#000',
        fontWeight: 'bold',
    },
    scrollContainer: {
        paddingBottom: 20,
    },
    podiumContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginVertical: 20,
    },
    firstPlace: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: width * 0.26,
        height: 320,
        marginHorizontal: 5,
        backgroundColor: '#FFD700',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },
    secondPlace: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: width * 0.26,
        height: 250,
        marginHorizontal: 5,
        backgroundColor: '#C0C0C0',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },
    thirdPlace: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: width * 0.26,
        height: 220,
        marginHorizontal: 5,
        backgroundColor: '#CD7F32',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },
    podiumTrophy: {
        width: 50,
        height: 50,
        marginTop: 10,
    },
    podiumImage: {
        width: 80,
        height: 80,
        marginTop: 10,
        borderRadius: 40,
        marginBottom: 10,
    },
    podiumName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF',
    },
    positionTime: {
        fontSize: 14,
        color: '#FFF',
        position: 'absolute',
        bottom: 10,
    },
    listContainer: {
        paddingHorizontal: 20,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#FFF',
        elevation: 2,
    },
    listPosition: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginRight: 10,
    },
    listImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    listText: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
    },
    listTime: {
        fontSize: 14,
        color: '#666',
    },
    menuContainer: {
        position: 'absolute',
        bottom: 10,
        width: '100%',
    },
    profileButton: {
        top: 25, //
        right: -10,
        width: 50,
        height: 50,
        borderRadius: 30,
        marginLeft: 50,
    },

});
