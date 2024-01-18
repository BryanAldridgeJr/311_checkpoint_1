const users = require('../data/index');
const sampleUser = require('../data/sampleUser');


// GET USERS
function getAllUsers(req, res) {
    try {
        return res.json(users);
    } catch (error) {
        console.error("Error getting users:", error);
        res.status(500).send("Internal Server Error");
    }
}

// GET USER BY ID
function getUserById(req,res) {
    try {
        const userId = parseInt(req.params.id);
        const user = users.find(user => user.id === userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found'})
        }

        res.json(user);
    } catch (error) {
        console.error("Error getting user:", error);
        res.status(500).send("Internal Server Error");
    }
}

// CREATE USER
function createUser(req, res) {
    try {
        const hardcodedUser = sampleUser
        
        users.push(hardcodedUser);
    
        res.json(users[users.length - 1]);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Internal Server Error");
    }
};

// UPDATE USER
function updateUser(req, res) {
    try {
        const userId = parseInt(req.params.id, 10);
        const user = users.find(user => user.id === userId);
    
        if (!user) {
        return res.status(404).send("User not found");
        }
    
        const updatedData = {
        name: 'Bryan Aldridge',
        username: 'Student',
        email: 'bryanaldridge@gmail.com',
        address: {
            street: "Cool Street",
            suite: "Suite 545",
            city: "Austin",
            zipcode: "54452-7771",
            geo: {
                "lat": "54.9509",
                "lng": "4.4618"
            }
        },
        phone: "524-685-7845",
        website: "google.net",
        company: {
            name: "Lebron-James",
            catchPhrase: "Proactive didactic contingency",
            bs: "synergize scalable supply-chains"
        }
        };
    
        for (const key in updatedData) {
        if (updatedData.hasOwnProperty(key)) {
            user[key] = updatedData[key];
        }
        }
    
        res.json(user);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send("Internal Server Error");
    }

};

// DELETE USER
function deleteUser(req, res) {
    try {
        const userId = parseInt(req.params.id); 
    
        const userIndex = users.findIndex(user => user.id === userId);
    
        if (userIndex === -1) {
        return res.status(404).send("User not found");
        }
    
        users.splice(userIndex, 1);
    
        res.send("deleted");
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};