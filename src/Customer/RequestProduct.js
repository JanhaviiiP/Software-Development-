import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';
import MyTextInput from '../Component/MyTextInput';
import auth from '@react-native-firebase/auth';

const RequestProduct = () => {
    const [shop, setShop] = useState('');
    const [shops, setShops] = useState([]);
    const [shopuserId,setShopUserId] =useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState('');
    const [products, setProducts] = useState([]);
    const [unit, setUnit] = useState('');
    const [units, setUnits] = useState([]);
    const [qty, setQty] = useState('');
    const [message, setMessage] = useState('');
    const [addedProducts, setAddedProducts] = useState([]);
    const [userId, setUserId] = useState('');
    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userMobile, setUserMobile] = useState('');

    useEffect(() => {
        const fetchCategoriesAndUnitsAndShops = async () => {
            // const catSnapshot = await firestore().collection('Category').where("Status", "==", "Active").get();
            // const unitSnapshot = await firestore().collection('Unit').where("Status", "==", "Active").get();
            const shopSnapshot = await firestore().collection('Shops').where("Status", "==", "Open").get();

            const shops = shopSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
 
            // const categories = catSnapshot.docs
                // .map(doc => ({ id: doc.id, ...doc.data() }))
                // .filter(category => userIds.includes(category.UserId));

            // const units = unitSnapshot.docs
            //     .map(doc => ({ id: doc.id, ...doc.data() }))
            //     .filter(unit => userIds.includes(unit.UserId));

            // setCategories(categories);
            // setUnits(units);
            setShops(shops);
        };

        fetchCategoriesAndUnitsAndShops();

        const fetchUserId = async () => {
            const user = auth().currentUser;
            if (user) {
                setUserId(user.uid);

                const userQuery = await firestore().collection('Users').where('uid', '==', user.uid).get();

                if (!userQuery.empty) {
                    const userData = userQuery.docs[0].data();
                    setUserFirstName(userData.firstName || '');
                    setUserLastName(userData.lastName || '');
                    setUserEmail(userData.email || '');
                    setUserMobile(userData.mobile || '');
                }
            }
        };

        fetchUserId();

    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            if (category) {
                const productSnapshot = await firestore().collection('Product')
                    .where("Status", "==", "Available")
                    .where("CategoryId", "==", category)
                    .get();

                setProducts(productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            }
        };
        fetchProducts();
    }, [category]);

    useEffect(() => {
        const fetchCat = async () => {
            if (shopuserId) {
                const catSnapshot = await firestore().collection('Category').where("Status", "==", "Active").where("UserId","==",shopuserId).get();
                const categories = catSnapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }));
                setCategories(categories);
            }
        };
        fetchCat();
    }, [shopuserId]);

    useEffect(() => {
        const fetchUnit = async () => {
            if (shopuserId) {
                const unitSnapshot = await firestore().collection('Unit').where("Status", "==", "Active").where("UserId","==",shopuserId).get();
                const units = unitSnapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }));
                setUnits(units);
            }
        };
        fetchUnit();
    }, [shopuserId]);

    const getShopUserId = async (shopId) => {
        try {
            const shopSnapshot = await firestore()
                .collection('Shops')
                .doc(shopId)
                .get();
    
            if (shopSnapshot.exists) {
                const shopData = shopSnapshot.data();
                console.log(shopData.UserId);
                setShopUserId(shopData.UserId);
                return shopData.UserId; // Assuming the user ID field is named 'userId'
            } else {
                console.log('No such document!');
                return null;
            }
        } catch (error) {
            console.error('Error fetching shop data: ', error);
            return null;
        }
    };

    const handleAddProduct = () => {
        if (!shop) {
            Alert.alert('Validation Error', 'Please select a shop');
            return;
        }
        if (!category) {
            Alert.alert('Validation Error', 'Please select a category');
            return;
        }
        if (!product) {
            Alert.alert('Validation Error', 'Please select a product');
            return;
        }
        if (!qty) {
            Alert.alert('Validation Error', 'Please enter quantity');
            return;
        }
        if (!unit) {
            Alert.alert('Validation Error', 'Please select a unit');
            return;
        }

        const selectedProduct = products.find(p => p.id === product);
        const selectedUnit = units.find(u => u.id === unit);
        setAddedProducts([...addedProducts, {
            id: product,
            name: selectedProduct.ProductName,
            qty,
            unit: selectedUnit.UnitName
        }]);
        // Reset the state variables
        setCategory('');
        setProduct('');
        setQty('');
        setUnit('');
        setMessage('');
    };

    const handleDeleteProduct = (productId) => {
        setAddedProducts(addedProducts.filter(p => p.id !== productId));
    };

    const renderItem = ({ item }) => (
        <View style={styles.tableRow}>
            <Text style={styles.tableCell}>{item.name}</Text>
            <Text style={styles.tableCell}>{item.qty}</Text>
            <Text style={styles.tableCell}>{item.unit}</Text>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteProduct(item.id)}>
                <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
        </View>
    );

    const handleSend = async () => {
        const currentDateTime = new Date();
        const requestData = {
            userId,
            userEmail,
            userMobile,
            userFirstName,
            userLastName,
            shopId: shop,
            shopname: shops.find(s => s.id === shop).ShopName,
            products: addedProducts,
            message,
            date: currentDateTime,
            Status: 'Pending'
        };

        await firestore().collection('ProductRequests').add(requestData);

        // Logic for sending the request goes here
        Alert.alert('Send', 'Request sent successfully');

        setShop('');
        setCategory('');
        setProduct('');
        setQty('');
        setUnit('');
        setMessage('');
        setAddedProducts([]);
    };

    const handleClose = () => {
        // Logic for closing the screen goes here
        Alert.alert('Close', 'Request form closed');
    };

    const handleShopChange = (value) => {
        if (addedProducts.length > 0) {
            Alert.alert(
                'Change Shop',
                'Are you sure you want to change the shop? All added products will be discarded.',
                [
                    { text: 'Cancel', style: 'cancel' },
                    {
                        text: 'OK',
                        onPress: () => {
                            setShop(value);
                            getShopUserId(value);
                            setAddedProducts([]);
                        }
                    }
                ]
            );
        } else {
            setShop(value);
            getShopUserId(value);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.add}>
                <Picker
                    selectedValue={shop}
                    onValueChange={handleShopChange}
                    style={styles.picker}
                    mode="dropdown"
                >
                    <Picker.Item label="Select Shop" value="" />
                    {shops.map((d) => (
                        <Picker.Item key={d.id} label={d.ShopName} value={d.id} />
                    ))}
                </Picker>
                <Picker
                    selectedValue={category}
                    onValueChange={setCategory}
                    style={styles.picker}
                    mode="dropdown"
                >
                    <Picker.Item label="Select Category" value="" />
                    {categories.map((cat) => (
                        <Picker.Item key={cat.id} label={cat.CategoryName} value={cat.id} />
                    ))}
                </Picker>
                <Picker
                    selectedValue={product}
                    onValueChange={setProduct}
                    style={styles.picker}
                    mode="dropdown"
                >
                    <Picker.Item label="Select Product" value="" />
                    {products.map((p) => (
                        <Picker.Item key={p.id} label={p.ProductName} value={p.id} />
                    ))}
                </Picker>
                <View style={styles.row}>
                    <MyTextInput
                        placeholder="Quantity"
                        fontSize={18}
                        width={100}
                        textAlign="left"
                        keyboardType="numeric"
                        value={qty}
                        onChangeText={setQty}
                        style={styles.quantityInput}
                    />
                    <Picker
                        selectedValue={unit}
                        onValueChange={setUnit}
                        style={[styles.picker, styles.unitPicker]}
                        mode="dropdown"
                    >
                        <Picker.Item label="Select Unit" value="" />
                        {units.map((u) => (
                            <Picker.Item key={u.id} label={u.UnitName} value={u.id} />
                        ))}
                    </Picker>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleAddProduct}>
                        <Text style={styles.buttonText}>Add</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonCancel} onPress={() => {
                        setCategory('');
                        setProduct('');
                        setQty('');
                        setUnit('');
                    }}>
                        <Text style={styles.buttonCancelText}>Clear</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.table}>
                <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderCell}>Product</Text>
                    <Text style={styles.tableHeaderCell}>Quantity</Text>
                    <Text style={styles.tableHeaderCell}>Unit</Text>
                    <Text style={styles.tableHeaderCell}>Action</Text>
                </View>
                <FlatList
                    data={addedProducts}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    style={styles.flatList}
                    contentContainerStyle={styles.flatListContent}
                />
            </View>
            <MyTextInput
                placeholder="Enter message for cartist"
                fontSize={18}
                width={300}
                textAlign="left"
                value={message}
                onChangeText={setMessage}
                style={styles.messageInput}
            />
            <View style={styles.bottomButtons}>
                <TouchableOpacity style={styles.buttonSend} onPress={handleSend}>
                    <Text style={styles.buttonSendText}>Send</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonClose} onPress={handleClose}>
                    <Text style={styles.buttonCloseText}>Close</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default RequestProduct;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    flatList: {
        height: 150,
        borderColor: '#ccc',
    },
    add: {
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        borderColor: '#808080',
        borderWidth: 2
    },
    picker: {
        width: '100%',
        marginBottom: 10,
        fontSize: 16,
        color: 'grey',
        backgroundColor: 'white',
        borderRadius: 5,
        borderColor: '#CCC',
        borderWidth: 1,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    quantityInput: {
        flex: 0.5,
        marginRight: 10,
        height: 40,
        paddingTop: 3,
        paddingHorizontal: 10,
        fontSize: 16,
        backgroundColor: 'white',
        borderColor: '#001090',
        color: '#202020'
    },
    unitPicker: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        width: '100%',
    },
    button: {
        flex: 1,
        backgroundColor: '#00aa00',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 5,
        marginHorizontal: 5,
        alignItems: 'center'
    },
    buttonCancel: {
        flex: 1,
        backgroundColor: 'white',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: 'grey',
        marginHorizontal: 5,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold'
    },
    buttonCancelText: {
        color: 'grey',
        fontSize: 14,
        fontWeight: 'bold'
    },
    table: {
        marginTop: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 10,
        color: 'black',
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        fontSize: 16,
        flex: 1,
        textAlign: 'center',
        color: 'black',
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        textAlign: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        color: 'black',
    },
    tableCell: {
        flex: 1,
        textAlign: 'center',
        color: 'black',
    },
    deleteButton: {
        backgroundColor: '#ff0000',
        borderRadius: 5,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    messageInput: {
        marginTop: 20,
        backgroundColor: 'white',
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        color: '#202020',
    },
    bottomButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    buttonSend: {
        flex: 1,
        backgroundColor: '#007bff',
        paddingVertical: 10,
        borderRadius: 5,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    buttonClose: {
        flex: 1,
        backgroundColor: '#6c757d',
        paddingVertical: 10,
        borderRadius: 5,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    buttonSendText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonCloseText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
