import React from 'react'
import { StatusBar, TouchableOpacity, TextInput, StyleSheet, Image, ImageBackground, Dimensions, ScrollView, Platform, SafeAreaView, FlatList, Picker } from 'react-native'
import { Container, Header, Content, Button, Icon, Text, Title, Left, Right, Body, Input, Item, Footer, View, FooterTab, Badge } from 'native-base'

import NavigationService from '@Service/Navigation'

import FEATURED from './Featured'
import Modal from "react-native-modal";

import Style from '@Theme/Style'
import Styles from '@Screen/Public/TravelAds/Style'

//const {width, height} = Dimensions.get('window')
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: undefined,    
            isFilterModalVisible: false,
            price:'low',
            selectedOption: null,
        };
    }

    onValueChange(value) {
        this.setState({
            selected: value
        });
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    }

    _toggleMobileModal = () =>
    this.setState({ isFilterModalVisible: !this.state.isFilterModalVisible });

    render() {
        return <Container style={Style.bgMain}>
            <Header style={Style.navigation}>
                <StatusBar backgroundColor="#39405B" animated barStyle="light-content" />

                <View style={Style.actionBarLeft}>
                    <Button transparent style={Style.actionBarBtn} onPress={() => {
                        NavigationService.navigate('PublicTravel')
                    }}>
                        <Icon active name='arrow-left' style={Style.textWhite} type="MaterialCommunityIcons" />
                    </Button>
                </View>
                <View style={Style.actionBarMiddle}>
                    <Text style={Style.actionBarText}>{'Travel & Amusement'}</Text>
                </View>
                <View style={Style.actionBarRight}>
                    <Button transparent style={Style.actionBtnRight} onPress={this._toggleMobileModal}>
                        <Icon active name='search' style={Style.actionIcon} type="FontAwesome" />
                    </Button>
                </View>
            </Header>


            <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>
                
                <ImageBackground source={require('@Asset/images/bg_white.png')} imageStyle={'cover'} style={Style.slider}>
                    <View style={{backgroundColor:'#f0f0f0', paddingVertical:5,paddingHorizontal:10}}>
                        <Text style={{color: '#39405B'}} >3,000 Travel Opportunities - USA</Text>
                    </View>
                    <View style={Styles.section}>
                        <FlatList
                            data={FEATURED}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item, separators }) => (
                                <TouchableOpacity style={Styles.item} underlayColor='transparent' onPress={() => { NavigationService.navigate('PublicTravelAdDetails') }}>
                                    <View style={Styles.itemLeft}>
                                        <Image source={{ uri: item.image }} style={Styles.itemImg} />                                        
                                    </View>
                                    <View style={Styles.itemRight}>
                                        <Text style={Styles.itemTitle}>{item.title}</Text>
                                        <Text style={Styles.itemPrice}>
                                            <Icon name="map-marker-multiple" type="MaterialCommunityIcons" style={Styles.headerIcon} />
                                            {item.location}
                                        </Text>
                                        {/* <Text style={Styles.itemPrice}>{item.price}</Text> */}
                                        <Text style={Styles.itemLocation}>{item.description}</Text>
                                        
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </ImageBackground>
            </Content>

            <Footer style={Style.greyTopLine}>
                <FooterTab style={Style.bgFilter}>
                    <Button style={Style.bgFilter} onPress={() => {
                        NavigationService.navigate('PublicTravelAds')
                    }}>
                        <Icon name="sort-amount-asc" type="FontAwesome" style={Style.textBlue} />
                        <Text style={Style.textBlack}>Sort by</Text>
                    </Button>
                    <Button style={Style.bgFilter} onPress={this._toggleMobileModal}>
                        <Icon name="filter" type="FontAwesome" style={Style.textBlue} />
                        <Text style={Style.textBlack}>Filter</Text>
                    </Button>
                </FooterTab>
            </Footer>
            <Modal isVisible={this.state.isFilterModalVisible}>
                    <View style={Styles.signBg}>
                        <View style={Styles.modalTopRow}>
                            <View style={{ flexDirection: 'row'}}>
                                <Icon type="FontAwesome"  name="filter" style={{color: '#39405B'}}/>
                                <Text style={Styles.modalTitle}>Travel Filter</Text>
                            </View>                            
                            <View style={Styles.modalButton}>
                                <Button style={Styles.btnApply} onPress={this._toggleMobileModal}>
                                    <Text style={Styles.applyBtnText}>{'apply'.toUpperCase()}</Text>                        
                                </Button>
                            </View>
                        </View>
                        <View style={Styles.modalRow}>
                            <Text style={Styles.modalLabel}>Price</Text>
                            <View style={Styles.formPicker}>
                                <Picker
                                    selectedValue={this.state.price}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ price: itemValue })}>
                                    <Picker.Item label="Low" value="low" style={Styles.pickerText} />
                                    <Picker.Item label="Medium" value="medium" />
                                    <Picker.Item label="High" value="high" />
                                </Picker>
                            </View>
                        </View>                            
                        <View style={Styles.modalRow}>
                            <Text style={Styles.modalLabel}>Location</Text>
                            <View>
                                 {/* <Select 
                                    value={selectedOption}
                                    onChange={this.handleChange}
                                    options={options} 
                                /> */}
                                <TextInput style={{borderRadius:5, borderWidth:1,borderColor: '#DDD'}} placeholder={'Enter Location'} />
                            </View>
                        </View>                            
                    </View>
                </Modal>
        </Container>
    }
}