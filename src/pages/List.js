import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import api from '../services/api'
import { MaterialIcons } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'

function List({ navigation }) {
    const [ devs, setDevs ] = useState([])
    async function loadDevs() {
        const response = await api.get('/devs')
        setDevs(response.data)
    }
    useEffect(() => {
        loadDevs()
    }, [])

    if (!devs) {
        return null
    }

    return (
        <>
            <SafeAreaView style={styles.viewList}>
                <ScrollView >
                    <View style={styles.addView}>
                        <TouchableOpacity onPress={() => { }} style={styles.addButton}>
                            <MaterialIcons name='person-add' size={26} color='#fff' />
                        </TouchableOpacity>
                        <Text style={styles.textAdd}>New Dev</Text>
                    </View>
                    {devs.map((dev) => (

                        <View key={dev._id} style={styles.itemList} >
                            <Image style={styles.avatar} source={{ uri: dev.avatar_url }} />
                            <View style={styles.infoItem}>
                                <View style={{ flexDirection: 'row' }} >
                                    <View style={{ flex: 1 }} >
                                        {dev.name ? <Text
                                            style={styles.name}
                                            onPress={() => {
                                                navigation.navigate('Profile',
                                                    { github_username: dev.github_username })
                                            }}>{dev.name}</Text> : null}
                                        <Text
                                            style={styles.userName}
                                            onPress={() => {
                                                navigation.navigate('Profile',
                                                    { github_username: dev.github_username })
                                            }}>{dev.github_username}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => {
                                        navigation.navigate('Main', {
                                            dev
                                        })
                                    }} style={styles.buttonMarket}>
                                        <FontAwesome5 name='map-marker-alt' size={18} color='#fff'></FontAwesome5>
                                    </TouchableOpacity>
                                </View>


                                {dev.bio ? <Text style={styles.bio}>Bio: {dev.bio}</Text> : null}
                                <Text style={styles.techs}>Tecnologias: {dev.techs.join(', ')}</Text>
                            </View>

                        </View>

                    ))}
                </ScrollView>
            </SafeAreaView >
        </>


    )
};

const styles = StyleSheet.create({
    addView: {
        backgroundColor: 'rgba(0,0,112,0.2)',
        paddingHorizontal: 10,
        marginHorizontal: 10,
        flexDirection: 'row',
        alignSelf: "center",
        borderRadius: 30,
        marginBottom: 5,
        elevation: 0.5,
        padding: 5,
    },
    addButton: {
        backgroundColor: '#ff6565',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        marginStart: 5,
        height: 40,
        width: 40,
    },
    textAdd: {
        fontSize: 20,
        marginStart: 10,
        marginEnd: 5,
        fontStyle: "normal",
        textAlignVertical: "center",
        color: '#555',
    },
    buttonMarket: {
        marginEnd: 5,
        marginTop: 5,
        width: 25,
        height: 25,
        backgroundColor: '#ff6565',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    },
    viewList: {
        backgroundColor: 'rgba(225,225,225,0.1)',
        paddingTop: 5,
    },
    infoItem: {
        marginStart: 10,
        flex: 1,

    },
    avatar: {
        marginStart: 5,
        marginTop: 5,
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    itemList: {
        flexDirection: 'row',
        paddingBottom: 2,
        marginTop: 3,
        marginHorizontal: 10,
        borderRadius: 2,
        elevation: 0.5,
        borderBottomWidth: 3,
        borderBottomColor: 'rgba(0,0,112,0.2)'
    },
    name: {
        fontSize: 12,
        textTransform: "capitalize"
    },
    userName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    bio: {
        textAlign: "justify",
        marginEnd: 5,
        color: '#666666',
        maxHeight: 30,
        fontSize: 12,

    },
    techs: {
        marginEnd: 5,
        marginEnd: 5,
        color: '#666666',
        fontSize: 13
    }

})


export default List