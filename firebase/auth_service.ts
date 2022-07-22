import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    User,
} from 'firebase/auth';
import { facebookProvider, fbAuth, googleProvider } from './firebase';

export interface ILoginForm {
    id: string;
    password: string;
}

export interface IRegisterForm {
    regId: string;
    regPassword: string;
    regPasswordConfirm: string;
    regDisPlayName: string;
}

class AuthService {
    socialLogin(providerName: string) {
        const authProvider = this.getProvider(providerName);
        return signInWithPopup(fbAuth, authProvider);
    }

    emailLogin(formData: ILoginForm) {
        return signInWithEmailAndPassword(
            fbAuth,
            formData.id,
            formData.password,
        );
    }

    emailRegister(formData: IRegisterForm) {
        return createUserWithEmailAndPassword(
            fbAuth,
            formData.regId,
            formData.regPassword,
        );
    }

    onAuthChange(onUserChanged: Function) {
        fbAuth.onAuthStateChanged((user) => {
            onUserChanged(user);
        });
    }

    getProvider(providerName: string) {
        switch (providerName) {
            case 'Google':
                return googleProvider;
            case 'Facebook':
                return facebookProvider;
            default:
                throw new Error(`지원하지 않는 provider : ${providerName}`);
        }
    }
}

export function getLoginUserObj(setUserObj: Function, router: any) {
    fbAuth.onAuthStateChanged((user: User | null) => {
        if (user) {
            setUserObj({
                email: user?.email,
                uid: user?.uid,
                displayName: user?.displayName,
                createDate: user?.metadata.creationTime,
            });
        } else {
            router.push('/login');
        }
    });
}

export default AuthService;
