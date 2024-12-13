import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, StyleSheet, ScrollView, TextInput, Button, Dimensions } from 'react-native';
import axios from 'axios';

// Get device dimensions
const { width } = Dimensions.get('window');
const isTabletOrLarger = width >= 768;

const HomePage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [viewInfoModalVisible, setViewInfoModalVisible] = useState(false); // State for View Info modal
  const [selectedEmployee, setSelectedEmployee] = useState(null); // State for selected employee
  const [employeeForm, setEmployeeForm] = useState({ name: '', position: '', image: '', email: '', phone: '' }); // State for employee form
  const [employees, setEmployees] = useState([
    { id: '1', name: 'CHRISTIAN JAQUE NEMARIA', position: 'Front-end/Back-end Web Developer', image: 'https://scontent.fmnl13-4.fna.fbcdn.net/v/t39.30808-6/453221581_1940739126438303_1191582821244208440_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeERbYkC0gGRXbRc7wNAoT_GN7i4HzVd7rs3uLgfNV3uuyZfiiaYpos7-Na7GQ3mmx-osS5qttbbYGHYg65_potH&_nc_ohc=JRQCsAg_zDsQ7kNvgFg5UWq&_nc_zt=23&_nc_ht=scontent.fmnl13-4.fna&_nc_gid=ANNSP282AMRJ6G3dKAWsXX7&oh=00_AYB4H5LZGwnoEeATWYmlhpD5G3FcXJBxCqrbvyAdqV5DGA&oe=6754418E' },
    { id: '2', name: 'JAYRALD ANGCAP', position: 'Front-end/Back-end Web Developer', image: 'https://scontent.fmnl13-2.fna.fbcdn.net/v/t39.30808-6/399586130_255334174184568_1965227539431390673_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeE0bXjBEAQtvvoI9WLfPcsezb8v7KNg2cjNvy_so2DZyNY8SllXOptTVN639-RRIep9up4B4AXByfr0YtZOYTzs&_nc_ohc=05neeTwkfvwQ7kNvgFKs01p&_nc_zt=23&_nc_ht=scontent.fmnl13-2.fna&_nc_gid=AYi5pvuAoin2Pfb-2BORLKB&oh=00_AYAsaSQ_D8W4p93xuJPWW94OLCeGutikVaO_edvrv-tPCg&oe=675413D8' },
    { id: '3', name: 'ALHAIDA ULA', position: 'Web Designer', image: 'https://pics.craiyon.com/2023-09-25/103d99738957493a8e279bced4120860.webp' },
    { id: '4', name: 'ANGEL KAYE BACONG', position: 'Web Designer', image: 'https://scontent-mnl1-2.xx.fbcdn.net/v/t1.15752-9/462638397_474734698554901_5849722043871620222_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeHVOYt_b1Cw92edoTFzmeJuNGrbp8Vcvt00atunxVy-3QrChXZPXVZ2FI6eeG_sI5PsE85xnQhUsZpSVnbVSWru&_nc_ohc=ihKHD2OfvFIQ7kNvgFHo5G2&_nc_zt=23&_nc_ht=scontent-mnl1-2.xx&oh=03_Q7cD1QEfRzYshjJSn5wbDJVeVvoteugBu1o0P6FY23ztKivHqQ&oe=678201DD' },
  ]);


  


const HandleFormSubmit = async () => {
  try {
    const response = await axios.post('http://localhost:8080/index.php', 
    {
      EmpName: employeeForm.name,
      EmpPosition: employeeForm.position,
      EmpEmail: employeeForm.email,
      EmpPhone: employeeForm.phone,
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    console.log('Response:', response.data);
    // Clear form and close modal if successful
    setEmployeeForm({ name: '', position: '', image: '', email: '', phone: '' });
    setModalVisible(false);
  } catch (error) {
    console.error('Error:', error);
  }
};



  
  const handleEmployeeSelect = (employee) => setSelectedEmployee(employee);

  const handleFormChange = (field, value) => setEmployeeForm({ ...employeeForm, [field]: value });

  const handleFormSubmit = () => {
    const newEmployee = { id: String(employees.length + 1), ...employeeForm };
    setEmployees([...employees, newEmployee]);
    setEmployeeForm({ name: '', position: '', image: '', email: '', phone: '' });
    setModalVisible(false);
  };


  const handleDeleteEmployee = (id) => setEmployees(employees.filter(employee => employee.id !== id));
  
  const handleViewInfo = () => setViewInfoModalVisible(true);
  const currentEmployee = selectedEmployee || employees[0];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logoText}>GROUP2MAD</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.mainText}>EMPLOYEE MANAGEMENT SYSTEM</Text>

        {/* Employee Card Section */}
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Image source={{ uri: currentEmployee.image }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{currentEmployee.name}</Text>
              <Text style={styles.cardDescription}>{currentEmployee.position}</Text>
            </View>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.viewButton} onPress={handleViewInfo}>
                <Text style={styles.viewButtonText}>View Info</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteEmployee(currentEmployee.id)}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View> 

        {/* View Info Modal */}
        {viewInfoModalVisible && (
          <Modal
            animationType="fade"
            transparent={true}
            visible={viewInfoModalVisible}
            onRequestClose={() => setViewInfoModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Employee Details</Text>
                <Image source={{ uri: currentEmployee.image }} style={styles.modalImage} />
                <Text style={styles.modalText}><Text style={styles.modalLabel}>Name:</Text> {currentEmployee.name}</Text>
                <Text style={styles.modalText}><Text style={styles.modalLabel}>Position:</Text> {currentEmployee.position}</Text>
                <Text style={styles.modalText}><Text style={styles.modalLabel}>Email:</Text> {currentEmployee.email || 'N/A'}</Text>
                <Text style={styles.modalText}><Text style={styles.modalLabel}>Phone:</Text> {currentEmployee.phone || 'N/A'}</Text>
                <TouchableOpacity style={styles.modalCloseButton} onPress={() => setViewInfoModalVisible(false)}>
                  <Text style={styles.modalCloseButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}

        {/* Modal Button for Adding Employee */}
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>Add Employee</Text>
        </TouchableOpacity>

         {/* Modal Component for Employee Form */}
         {modalVisible && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Add Employee</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  value={employeeForm.name}
                  onChangeText={(text) => handleFormChange('name', text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Position"
                  value={employeeForm.position}
                  onChangeText={(text) => handleFormChange('position', text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Image URL"
                  value={employeeForm.image}
                  onChangeText={(text) => handleFormChange('image', text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={employeeForm.email}
                  onChangeText={(text) => handleFormChange('email', text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Phone"
                  value={employeeForm.phone}
                  onChangeText={(text) => handleFormChange('phone', text)}
                />
                <Button title="Save" onPress={handleFormSubmit} />
                <TouchableOpacity
                  style={styles.modalCloseButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalCloseButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}

            {/* Employee List Section */}
        <View style={styles.listContainer}>
          {employees.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.listItem}
              onPress={() => handleEmployeeSelect(item)}
            >
              <Text style={styles.listItemTitle}>{item.name}</Text>
              <Text style={styles.listItemDescription}>{item.position}</Text>
            </TouchableOpacity>
          ))}
        </View>
          
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  listContainer:{
    marginTop: 20,
  },
  listItem:{
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  listItemTitle:{
    fontSize: 18,
    fontWeight: 'bold',
  },
  listItemDescription:{
    fontSize: 14,
    color: '#555',
  },

    container: {
      flex: 1,
      backgroundColor: 'white',
      padding: 20,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    logoText: {
      fontSize: 24,
      fontWeight: 'bold',
      color:'skyblue',
    },
    content: {
      marginTop: 20,
    },
    mainText: {
      fontSize: 40,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color:'skyblue',   },
      cardContainer: {
      alignItems: 'center',
      marginBottom: 20,
      fontStyle: 'italic',
    },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: 15,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 3,
      width: '100%',
    },
    cardImage: {
      width: 80,
      height: 80,
      borderRadius: 40,
      marginRight: 15,
    },
    cardContent: {
      flex: 1,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    cardDescription: {
      fontSize: 14,
      color: '#555',
    },
    actionButtons: {
      flexDirection: 'row',
    },
    viewButton: {
      backgroundColor: 'skyblue',
      padding: 5,
      borderRadius: 5,
      marginRight: 5,
    },
    viewButtonText: {
      color: '#fff',
      fontSize: 14,
    },
    deleteButton: {
      backgroundColor: 'red',
      padding: 5,
      borderRadius: 5,
      width: 80,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 5, 
    },
    deleteButtonText: {
      color: '#fff',
      fontSize: 14,
    },
    addButton: {
    backgroundColor: 'skyblue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
    
    },
    addButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight:'bold',
    },
    modalContainer: {
      flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      width: '80%',
      alignItems: 'center', 
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    modalText: {
      fontSize: 16,
      marginBottom: 5,
    },
    modalLabel: {
      fontWeight: 'bold',
    },
    modalCloseButton: {
      backgroundColor: '#6200ea',
      padding: 10,
      borderRadius: 5,
      marginTop: 20,
    },
    modalCloseButtonText: {
      color: '#fff',
      fontSize: 16,
    },
    modalImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 15,
    },
    input: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      paddingLeft: 10,
      marginBottom: 10,
      width: '100%',
    },
});

export default HomePage;   