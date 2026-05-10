import React from 'react'
import { FlatList, Text, View } from 'react-native'

const HomeScreen = () => {
  const users = [

    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Designer'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'Developer'
    },
    {
      id: 3,
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      role: 'Manager'
    }
  ]
  return (
    <FlatList
      data={users}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ebb8b8' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
          <Text>{item.email}</Text>
          <Text style={{ color: 'gray' }}>{item.role}</Text>
        </View>
      )}
    />
  )
}

export default HomeScreen