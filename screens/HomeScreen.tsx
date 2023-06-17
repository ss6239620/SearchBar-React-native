import React, { Component } from 'react';
import { View, StatusBar, FlatList, Platform, UIManager, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientCard from '../Components/GradientCard';
import { ScreenWidth } from '@freakycoder/react-native-helpers';
/**
 * ? Local Imports
 */
// import SearchBar from "react-native-dynamic-search-bar";
import SearchBar from 'react-native-dynamic-search-bar';
import styles, { centerSubtitleStyle } from '../styles';
// Static Data
import staticData from '../src/data/staticData';

interface IProps { }

interface IState {
    query: string;
    dataBackup: any;
    dataSource: any;
    isLoading: boolean;
    refreshing: boolean;
    spinnerVisibility: boolean;
}

export default class App extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            query: '',
            isLoading: true,
            refreshing: false,
            dataBackup: staticData,
            dataSource: staticData,
            spinnerVisibility: false,
        };

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental &&
                UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    filterList = (text: string) => {
        var newData = this.state.dataBackup;
        newData = this.state.dataBackup.filter((item: any) => {
            const itemData = item.name.toLowerCase();
            const textData = text.toLowerCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            query: text,
            dataSource: newData,
        });
    };

    renderRightComponent = (item: any) => (
        <View>
            <Text>12/08/2023</Text>
        </View>
    );

    renderItem(item: any) {
        return (
            <GradientCard
                key={item.name}
                title={item.name}
                style={styles.cardStyle}
                imageSource={item.image}
                centerTitle={item.value}
                subtitle={item.shortName}
                width={ScreenWidth * 0.9}
                centerSubtitle={item.change}
                shadowStyle={styles.cardShadowStyle}
                centerSubtitleStyle={centerSubtitleStyle(item)}
                rightComponent={this.renderRightComponent(item)}
            />
        );
    }

    render() {
        const { spinnerVisibility } = this.state;
        return (
            <SafeAreaView style={styles.safeAreaViewStyle}>
                <StatusBar barStyle={'light-content'} />
                <View style={styles.container}>
                    <SearchBar
                        darkMode
                        placeholder="Search"
                        spinnerVisibility={spinnerVisibility}
                        style={{ backgroundColor: '#353d5e' }}
                        onChangeText={text => {
                            if (text.length === 0) {
                                this.setState({ spinnerVisibility: false });
                            } else {
                                this.setState({ spinnerVisibility: true });
                            }
                            this.filterList(text);
                        }}
                        onClearPress={() => {
                            this.filterList('');
                        }}
                    />
                    <ScrollView>
                        <View style={styles.flatListStyle}>
                            {this.state.dataSource.map((item: any, index: number) => (
                                <TouchableOpacity>
                                    <GradientCard
                                        key={index}
                                        title={item.name}
                                        style={styles.cardStyle}
                                        imageSource={item.image}
                                        centerTitle={item.value}
                                        subtitle={item.shortName}
                                        width={ScreenWidth * 0.9}
                                        centerSubtitle={item.change}
                                        shadowStyle={styles.cardShadowStyle}
                                        centerSubtitleStyle={centerSubtitleStyle(item)}
                                        rightComponent={this.renderRightComponent(item)}
                                    />
                                </TouchableOpacity>
                            ))}

                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}