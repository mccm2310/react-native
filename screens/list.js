import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput
} from "react-native";
// import styles from "../styles/_base";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from "react-native-table-component";
import Home from "./home";
import {NavigationActions} from 'react-navigation';
import { DrawerActions } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import stylesBase from "../styles/_base";
import { Col as ColGrid, Row as RowGrid, Grid } from "react-native-easy-grid";

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ["Nombre y Apellido", "Area/Cargo", "Acciones"],
      tableData: [
        ["Juan Casares", "Montaje/Supervisor", ""],
        ["Martín Banfi", "Pintura/Director", ""],
        ["Manuel Biondi", "Chapisteria/Gerente", ""],
        ["Emanuel Blasi", "Montaje/Mecánico", ""]
      ],
      tableTextDetail: [
        {"Fecha de Ingreso":"27/10/2017","Email":"jcasares@algo.com", "Telefono":"1 5410 5410"},
        {"Fecha de Ingreso":"12/09/2017","Email":"mbanfi@algo.com", "Telefono":"2 5410 5410"},
        {"Fecha de Ingreso":"13/10/2017","Email":"mbiondi@algo.com", "Telefono":"3 5410 5410"},
        {"Fecha de Ingreso":"24/10/2017","Email":"eblasi@algo.com", "Telefono":"4 5410 5410"},
      ],
      tempData : [],
      tempDetail: {},
      modalVisible: false,
      itemSelected: 0,
      actionSelected:''
    };
  }

  _showModal (param, index){
    this.setState({actionSelected: param});
    this.setState({modalVisible: true});
    if(index)
    this.setState({itemSelected: index});
  }

  _hideModal () {
    this.setState({modalVisible: false});
    this.setState({tempDetail : {}});
    this.setState({tempData : []});
    this.setState({itemSelected : 0});
  }

  _viewUser(index) {
    this._showModal('view', index);
  }

  _newUser() {
    this._showModal('add');
  }

  _editUser(index) {
    this._showModal('edit', index);
  }

  _deleteUser(index) {
    this.state.tableData.splice(index, 1)
    this.setState({tableData: this.state.tableData});
  }

  _updateUser() {
    if(Object.keys(this.state.tempDetail).length!=0)
    this.state.tableTextDetail[this.state.itemSelected] = this.state.tempDetail;

    if(this.state.tempData.length !=0)
    this.state.tableData[this.state.itemSelected] = this.state.tempData;

    this.setState({tableTextDetail : this.state.tableTextDetail});
    this.setState({tableData : this.state.tableData});
    this.setState({modalVisible: false});
  }

  _goBackBtn() {
    return (
      <View
      style={{
        position: 'absolute',
        bottom: 25,
        alignItems: "center",
        flex: 1,
        alignSelf: 'center'
      }}>
        <Button
          title="Volver"
          loading
          loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
          titleStyle={{ fontWeight: "200", color: "#d1d8de" }}
          buttonStyle={{
            width: 300,
            height: 45,
            borderColor: "#d1d8de",
            borderWidth: 1,
            borderRadius: 15,
            paddingVertical: 10,
            paddingHorizontal: 15
          }}
          onPress={() => {
            this._hideModal()}}
        />
      </View>
    )
  }

  _saveBtn() {
    const parent = this;
    return (
      <View
      style={{
        bottom: 40,
        alignItems: "center",
        alignSelf: 'center',
      }}>
        <Button
          title="Guardar"
          loading
          loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
          titleStyle={{ fontWeight: "200", color: "#d1d8de" }}
          buttonStyle={{
            width: 300,
            height: 45,
            borderColor: "#d1d8de",
            borderWidth: 1,
            borderRadius: 15,
            paddingVertical: 10,
            paddingHorizontal: 15
          }}
          onPress={() => { parent.state.actionSelected == 'edit' ? parent._updateUser(): parent._createUser() }}
        />
      </View>
    )
  }

  _viewModal() {
    const state = this.state;
    const detail = [];
    return (
      <View>
        <Text style={{fontSize: 30, fontWeight: 'bold', marginTop: 25}}>
              {state.tableData[state.itemSelected][0]}</Text>
        <Text>{state.tableData[state.itemSelected][1]}</Text>
        <View
          style={{
            marginVertical: 50,
            paddingLeft:5
          }}>
          {Object.keys(state.tableTextDetail[state.itemSelected]).forEach( 
            function (rowData, idx) {
              detail.push(
                <View key={idx}>
                  <Text style={{fontSize: 16, marginBottom:20}}>
                    <Text>{Object.keys(state.tableTextDetail[state.itemSelected])[idx]}: </Text>
                    <Text style={{fontWeight: 'bold'}}>{state.tableTextDetail[state.itemSelected][rowData]}</Text>
                  </Text>
                </View>
                )
            }
          )}
          <View>{detail}</View>
        </View>
      </View>
    )
  }

  _changeDetailData(key, text) {
    this.state.tempDetail = Object.assign({},this.state.tableTextDetail[this.state.itemSelected]);
    this.state.tempDetail[key] = text;
    this.setState({tempDetail : this.state.tempDetail});
  }

  _changeHeadData(idx, text) {
    this.state.tempData = [].concat(this.state.tableData[this.state.itemSelected]);
    this.state.tempData[idx] = text;
    this.setState({tempData : this.state.tempData});
  }

  _newDetailData(key, text) {
    this.state.tempDetail[key] = text;
    this.setState({tempDetail : this.state.tempDetail});
  }

  _newHeadData(text) {
    this.state.tempData.push(text);
    this.setState({tempData : this.state.tempData});
  }

  _editModal() {
    const parent = this;
    const state = parent.state;
    const detail = [];

    return (
      <View>
        <Text style={{fontSize: 16, marginBottom:5,marginTop:10}}>Nombre y Apellido: </Text>
        <TextInput
          style={{paddingHorizontal: 15, paddingVertical:5, marginLeft:25, fontSize: 23}}
          onChangeText={(text) => {this.value={text}; parent._changeHeadData(0, text)}}
          defaultValue={state.tableData[state.itemSelected][0]}
        />
        <Text style={{fontSize: 16, marginBottom:5,marginTop:10}}>Area/Cargo </Text>
        <TextInput
          style={{paddingHorizontal: 15, paddingVertical:5, marginLeft:25, fontSize: 18}}
          onChangeText={(text) => {this.value={text}; parent._changeHeadData(1, text)}}
          defaultValue={state.tableData[state.itemSelected][1]}
        />
        <View
          style={{
            marginVertical: 50,
            paddingLeft:5
          }}>
          {Object.keys(state.tableTextDetail[state.itemSelected]).forEach( 
            function (objKey, idx) {
              detail.push(
                <View key={idx}>
                    <Text style={{fontSize: 16, marginBottom:5,marginTop:10}}>{Object.keys(state.tableTextDetail[state.itemSelected])[idx]}: </Text>
                    <TextInput
                      style={{paddingHorizontal: 15, paddingVertical:5, marginLeft:25}}
                      onChangeText={(text) => {this.value={text}; parent._changeDetailData(objKey, text)}}
                      defaultValue={state.tableTextDetail[state.itemSelected][objKey]}
                    />
                </View>
                )
            }
          )}
          <View>{detail}</View>
        </View>
      </View>
    )
  }

  _createUser() {
    this.state.tableTextDetail.push(this.state.tempDetail);
    this.state.tableData.push(this.state.tempData);

    this.setState({tableTextDetail : this.state.tableTextDetail});
    this.setState({tableData : this.state.tableData});
    this.setState({modalVisible: false});
  }

  _createModal() {
    const parent = this;
    const state = parent.state;
    const detail = [];
    var hasName = false;
    return (
      <View>
        <Text style={{fontSize: 16, marginBottom:5,marginTop:10}}>Nombre y Apellido: </Text>
        <TextInput
          style={{paddingHorizontal: 15, paddingVertical:5, marginLeft:25, fontSize: 23}}
          onChangeText={(text) => {this.value={text}; parent._newHeadData(text)}}
        />
        <Text style={{fontSize: 16, marginBottom:5,marginTop:10}}>Area/Cargo </Text>
        <TextInput
          style={{paddingHorizontal: 15, paddingVertical:5, marginLeft:25, fontSize: 18}}
          onChangeText={(text) => {this.value={text}; parent._newHeadData(text)}}
        />
        <Text>{hasName}</Text>
        <View
          style={{
            marginVertical: 50,
            paddingLeft:5
          }}>
          {Object.keys(state.tableTextDetail[state.itemSelected]).forEach( 
            function (objKey, idx) {
              detail.push(
                <View key={idx}>
                    <Text style={{fontSize: 16, marginBottom:5,marginTop:10}}>{Object.keys(state.tableTextDetail[state.itemSelected])[idx]}: </Text>
                    <TextInput
                      style={{paddingHorizontal: 15, paddingVertical:5, marginLeft:25}}
                      onChangeText={(text) => {this.value={text}; parent._newDetailData(objKey, text)}}
                    />
                </View>
                )
            }
          )}
          <View>{detail}</View>
        </View>
      </View>
    )
  }

  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
    this.props.navigation.dispatch(DrawerActions.closeDrawer());
  };

  render() {
    const state = this.state;
   
    {/* Acciones de la tabla de usuarios */}
    const element = (data, index) => (
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'flex-start',
          justifyContent: "center"
        }}>
        <TouchableOpacity  onPress={() => { this._viewUser(index); }}
            style={{marginRight: 6}}>
                <Ionicons name="md-eye" size={24}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this._editUser(index)} style={{marginRight: 6, marginLeft: 10}}>
            <Ionicons name="md-create" size={24}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this._deleteUser(index)} style={{marginLeft: 10}} >
            <Ionicons name="md-close-circle" size={24}/>
        </TouchableOpacity>
      </View>
    );

    return (
      <View
       style={styles.list}
      >

        <View
          style={{
            alignSelf: 'flex-end',
            position: 'absolute',
            bottom: 25,
            right: 10
          }}>
          <TouchableOpacity onPress={() => this._newUser()} style={{marginRight: 6}}>
              <Ionicons name="md-add-circle" size={48}/>
          </TouchableOpacity>
        </View>


        {/* Head de usuarios registrados */}
        <View
          style={{
            alignItems: "center",
            margin: 20,
            alignSelf: 'flex-start',
          }}
        >
          <Text style={{
            fontSize:24,
            fontWeight: 'bold',

          }}>Registered Users</Text>

        </View>
        {/* Tabla de usuarios registrados */}
        <View>
          <Table
            style={{
              marginLeft: 12,
              marginRight: 12,
            }}
            borderStyle={{borderColor: "#014E65"}}>
            <Row
              data={state.tableHead}
              style={styles.head}
              textStyle={{
                color:'#fff',
                margin: 6
              }}
            />
            </Table>
            <Table
              style={{
                marginLeft: 12,
                marginRight: 12,
              }}
              borderStyle={{borderColor: "#fff"}}>
              {state.tableData.map((rowData, index) => (
                <TableWrapper key={index} style={styles.row}>
                  {rowData.map((cellData, cellIndex) => (
                    <Cell
                      key={cellIndex}
                      data={
                        cellIndex === 2 ? element(cellData, index) : cellData
                      }
                      textStyle={styles.text}
                    />
                  ))}
                </TableWrapper>
            ))}
          </Table>
        </View>

        {/* Modal con detalle de usuario */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => { this._hideModal(); }}
          style={{flexDirection: "row"}}
          >
            <View
              style={{
                flex: 1,
                alignItems: 'flex-start',
                padding: 15,
                borderColor:'blue', borderWidth:2
                }}>
                <View
                  style={{
                    alignSelf: 'flex-end',
                    position: 'absolute',
                    top: 5,
                    right: 5
                  }}>
                  <TouchableOpacity onPress={() => {
                        this._hideModal()}}
                    style={{
                      marginRight: 6,
                      backgroundColor: '#000',
                      borderRadius: 15,
                      paddingVertical: 4,
                      paddingHorizontal:8
                      }}>
                      <Ionicons name="md-close" size={24} style={{color:'#fff'}}/>
                  </TouchableOpacity>
                </View>

                {state.actionSelected == 'view' ? this._goBackBtn() : null}
                <View
                  style={{
                    marginTop:45,
                    marginBottom:65,
                    marginHorizontal:10,
                    width: '90%'
                  }}>
                  
                  {state.actionSelected == 'view' ? this._viewModal() : state.actionSelected == 'edit' ?  this._editModal() : state.actionSelected == 'add' ?  this._createModal(): null}
                </View>
                {state.actionSelected != 'view' ? this._saveBtn(): null}
            </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: "#014E65" },
  text: { margin: 6 },
  row: { flexDirection: "row", backgroundColor: "#fff" },
  btn: { width: 58, height: 18, backgroundColor: "#78B7BB", borderRadius: 2 },
  btnText: { textAlign: "center", color: "#fff" }
});
