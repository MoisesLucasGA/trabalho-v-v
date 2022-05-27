import Modal from 'antd/lib/modal/Modal'
import { getDocs, addDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase-config'
import { useState, useEffect } from 'react'
import 'moment/locale/pt-br';
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Grid } from '@material-ui/core';
import { useHistory } from "react-router-dom";

export const LoginModal = (props) => {
    const formik = useFormik({
        initialValues: {
            login: "",
            senha: "",
        },
        validationSchema: Yup.object({
            login: Yup.string().required("Campo Obrigatório"),
            senha: Yup.string().required("Campo Obrigatório"),
        }),
        onSubmit: async () => {
            await logar();
            // await createPatient(values);
            // resetForm()
        },
    });
    let history = useHistory();

    const [isModalVisible, setIsModalVisible] = useState(true);
    // const [admins, setAdmins] = useState([]);

    const peopleCollectionRef = collection(db, "admin");



    // const showModalError = () => {
    //     setIsModalVisible(true);
    // };

    const handleOkAndCancelModalError = () => {
        setIsModalVisible(false);
    };



    // const createPatient = async (data) => {
    //     try {
    //         if (props.patients.length > 0) {
    //             if (props.patients.find((patient) => patient.cpf === data.cpf) === undefined) {
    //                 await addDoc(peopleCollectionRef, data)
    //             } else {
    //                 showModalError()
    //             }
    //         } else {
    //             await addDoc(peopleCollectionRef, data)
    //         }



    //     } catch (err) {
    //         console.log(err)
    //     }

    // }

    const logar = async () => {
        try {
            const logins = await getDocs(peopleCollectionRef)
            //setAdmins(logins.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            var admins = logins.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

            console.log(admins);
            const res = admins.filter((admin) => (formik.values.login === admin.login && formik.values.senha === admin.senha));
            console.log(res.length);
            if(res.length > 0){
                handleOkAndCancelModalError();
                history.push("/patient");
            }
            else
                alert('Login ou Senha incorretos');
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Modal
                title="Realize Login no Sistema"
                visible={isModalVisible}
                closable={false}
                onOk={async () => formik.handleSubmit()}
                okText={"Logar"}
                onCancel={props.onCancel}
                cancelText={"Cancelar"}
            >
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                InputLabelProps={{ style: { pointerEvents: "auto" } }}
                                id="login"
                                fullWidth
                                label={<div>Login</div>}
                                variant="outlined"
                                name="login"
                                value={formik.values.login}
                                onChange={(e) => { formik.setFieldValue("login", e.target.value) }}
                                onBlur={formik.handleBlur}
                                error={!!(formik.touched.login && formik.errors.login)}
                                helperText={
                                    formik.touched.login && formik.errors.login && formik.errors.login
                                }
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                InputLabelProps={{ style: { pointerEvents: "auto" } }}
                                id="senha"
                                fullWidth
                                label={<div>Senha</div>}
                                variant="outlined"
                                name="senha"
                                type="password"
                                value={formik.values.senha}
                                onChange={(e) => { formik.setFieldValue("senha", e.target.value) }}
                                onBlur={formik.handleBlur}
                                error={!!(formik.touched.senha && formik.errors.senha)}
                                helperText={
                                    formik.touched.senha && formik.errors.senha && formik.errors.senha
                                }
                            />
                        </Grid>
                    </Grid>
                </form>
            </Modal>
        </>
    )
}
