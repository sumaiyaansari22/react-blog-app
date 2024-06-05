import {Client, Account, ID} from "appwrite";
import conf from "../conf/conf";

class AuthService{
    client = new Client();
    account;

    constructor(){
        console.log(conf.appwriteURL);
        this.client
        .setEndpoint(conf.appwriteURL)
        .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email,password,name}){
        try{
            const userAccount = await this.account.create(ID.unique(),email,password,name);
            if(userAccount){
               return await this.login({email,password});
            }else{
                return userAccount;
            }
        }catch(err){
            throw err;
        }
    }

    async login({email,password}){
        try{
            return await this.account.createEmailPasswordSession(email, password);
        }catch(err){
            throw err;
        }
    }

    async getCurrentUser(){
        try{
            return await this.account.get();
        }catch(err){
            console.log("Appwrite service :: getCurrentUser :: error",err);
        }
    }

    async logout(){
        try{
            await this.account.deleteSessions();
        }catch(err){
            console.log("Appwrite service :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService;