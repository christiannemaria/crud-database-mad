import { useNavigation } from "@react-navigation/native";
import React, { useState } from 'react';
import { Button, SafeAreaView, Text, TextInput, View, StyleSheet, ImageBackground } from 'react-native';

const LoginPage = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState(null);

    const users = [
        { email: '', password: '', role: 'admin' },
        { email: 'employee@example.com', password: 'employeePassword', role: 'employee' },
    ];

    const handleLogin = () => {
        // Find the user from the "database" based on email, password, and selected role
        const user = users.find(u => u.email === email && u.password === password && u.role === selectedRole);

        if (user) {
            // Navigate to the appropriate screen based on the user's role
            const targetScreen = user.role === 'admin' ? 'AdminTasks' : 'EmployeeTasks';
            navigation.navigate('Tasks');
        } else {
            // If no matching user is found, show an alert
            alert('Invalid email, password, or role');
        }
    };

    return (
        <ImageBackground
            source={{ uri: 'https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjk2MC1uaW5nLTMwLmpwZw.jpg' }}
            style={styles.backgroundImage}
        >
            <SafeAreaView style={styles.container}>
                {!selectedRole ? (
                    <View style={styles.roleSelectionContainer}>
                        <Text style={styles.welcomeText}>Select User</Text>

                        <Button
                            onPress={() => setSelectedRole('admin')}
                            title="Admin"
                            color="#9cded8"
                        />
                        <View style={styles.buttonSpacing} />
                        <Button
                            onPress={() => setSelectedRole('employee')}
                            title="Employee"
                            color="#9cded8"
                        />
                    </View>
                ) : (
                    <View style={styles.innerContainer}>
                        <Text style={styles.HeaderText}>
                            {selectedRole === 'admin' ? 'Admin Login' : 'Employee Login'}
                        </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />

                        <Button
                            onPress={handleLogin}
                            title="Login"
                            color="#9cded8"
                        />

                        <View style={styles.buttonSpacing} />
                        <Button
                            onPress={() => setSelectedRole(null)}
                            title="Back"
                            color="#9cded8"
                        />
                    </View>
                )}
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    HeaderText: {
        fontSize: 30,
        padding: 10,
        marginBottom: 10,
        textAlign: 'center',
        color: '#9cded8',
        fontWeight: 'bold',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerContainer: {
        width: '90%',
        maxWidth: 400, // Ensures responsiveness
        padding: 20,
        borderRadius: 10,
        backgroundColor: 'transparent', // Semi-transparent background for better readability
        alignItems: 'center',
    },
    roleSelectionContainer: {
        alignItems: 'center',
        padding: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: 10,
    },
    welcomeText: {
        fontSize: 20,
        padding: 10,
        marginBottom: 20,
        textAlign: 'center',
        color: '#9cded8',
    },
    input: {
        width: '100%',
        padding: 12,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#9cded8',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    buttonSpacing: {
        height: 10,
    },
});

export default LoginPage;