import Promise from 'bluebird';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    }
});

UserSchema.method({

});

UserSchema.statics = {
    findUserById(id) {
        return this.findById(id)
            .exec()
            .then((user) => {
                if (user) return user;
                return Promise.reject(new Error('User not found'));
            });
    },

    findUserByName(name) {
        return this.find({ name: new RegExp('^' + name + '$', "i") })
            .exec()
            .then((users) => {
                return users;
            })
    },

    findUserByUsername(username) {
        return this.findOne({username: username})
            .exec()
            .then(user => {
                if(user) return user;
                return Promise.reject(new Error('User not found'));
            });
    }

}

export default mongoose.model('User', UserSchema);