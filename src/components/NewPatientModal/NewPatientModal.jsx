import Modal from 'antd/lib/modal/Modal'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase-config'
import { useState } from 'react'
import 'moment/locale/pt-br';
import { cpfMask } from '../maskCpf';
import { useFormik } from "formik";
import * as Yup from "yup";
import { MenuItem, TextField, Grid } from '@material-ui/core';

export const NewPatientModal = (props) => {
    const formik = useFormik({
        initialValues: {
            name: "",
            dateBirth: "",
            gender: "",
            addres: "",
            cpf: "",
            status: true,
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Campo Obrigatório"),
            dateBirth: Yup.string().required("Campo Obrigatório"),
            gender: Yup.string().required("Campo Obrigatório"),
            cpf: Yup.string().required("Campo Obrigatório"),
            status: Yup.string().required("Campo Obrigatório"),
        }),
        onSubmit: async (values, { resetForm }) => {
            await createPatient(values);
            resetForm()
        },
    });

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModalError = () => {
        setIsModalVisible(true);
    };

    const handleOkAndCancelModalError = () => {
        setIsModalVisible(false);
    };

    const peopleCollectionRef = collection(db, "pessoas")

    const createPatient = async (data) => {
        try {
            if (props.patients.length > 0) {
                if (props.patients.find((patient) => patient.cpf === data.cpf) === undefined) {
                    await addDoc(peopleCollectionRef, data)
                } else {
                    showModalError()
                }
            } else {
                await addDoc(peopleCollectionRef, data)
            }

        } catch (err) {
            console.log(err)
        }

    }

    return (
        <>
            {/* Modal de Erro*/}
            <Modal visible={isModalVisible} onOk={handleOkAndCancelModalError} onCancel={handleOkAndCancelModalError}>
                <h2>CPF já cadastrado</h2>
                <p>Não é possível cadastrar este paciente com este CPF, pois o CPF já foi cadastrado no sistema. </p>
            </Modal>
            {/* Modal de Novo Paciente*/}
            <Modal
                title="Novo Paciente"
                visible={props.visible}
                onOk={async () => {
                    await formik.handleSubmit()
                    props.onOk()
                }}
                okText={"Criar"}
                onCancel={props.onCancel}
                cancelText={"Cancelar"}
            >
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                InputLabelProps={{ style: { pointerEvents: "auto" } }}
                                id="name"
                                fullWidth
                                label={<div>Nome *</div>}
                                variant="outlined"
                                name="name"
                                value={formik.values.name}
                                onChange={(e) => { formik.setFieldValue("name", e.target.value) }}
                                onBlur={formik.handleBlur}
                                error={!!(formik.touched.name && formik.errors.name)}
                                helperText={
                                    formik.touched.name && formik.errors.name && formik.errors.name
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                select
                                label={<div>Gênero</div>}
                                fullWidth
                                variant="outlined"
                                value={formik.values.gender}
                                onBlur={formik.handleBlur}
                                error={formik.touched.gender && formik.errors.gender}
                                helperText={formik.touched.gender && formik.errors.gender}
                                onChange={(e) => { formik.setFieldValue("gender", e.target.value) }}
                            >
                                <MenuItem key={0} value="Masculino">
                                    Masculino
                                </MenuItem>
                                <MenuItem key={1} value="Feminino">
                                    Feminino
                                </MenuItem>
                                <MenuItem key={2} value="Outro">
                                    Outro
                                </MenuItem>
                            </TextField>

                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                InputLabelProps={{ style: { pointerEvents: "auto" } }}
                                id="dateBirth"
                                fullWidth
                                label={<div>Data de Nascimento</div>}
                                variant="outlined"
                                name="dataBirth"
                                value={formik.values.dateBirth}
                                onChange={(e) => { formik.setFieldValue("dateBirth", e.target.value) }}
                                onBlur={formik.handleBlur}
                                error={!!(formik.touched.dateBirth && formik.errors.dateBirth)}
                                helperText={
                                    formik.touched.dateBirth && formik.errors.dateBirth && formik.errors.dateBirth
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                InputLabelProps={{ style: { pointerEvents: "auto" } }}
                                id="addres"
                                fullWidth
                                label={<div>Endereço</div>}
                                variant="outlined"
                                name="addres"
                                value={formik.values.addres}
                                onChange={(e) => { formik.setFieldValue("addres", e.target.value) }}
                                onBlur={formik.handleBlur}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                id='cpf'
                                label='CPF'
                                formik={formik}
                                value={formik.values.cpf}
                                onChange={(event) => {
                                    formik.setFieldValue('cpf', cpfMask(event.target.value))
                                }}
                                onBlur={formik.handleBlur}
                                error={formik.touched.cpf && formik.errors.cpf}
                                helperText={formik.touched.cpf && formik.errors.cpf}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Status"
                                select
                                fullWidth
                                variant="outlined"
                                value={formik.values.status}
                                onBlur={formik.handleBlur}
                                error={formik.touched.status && formik.errors.status}
                                helperText={formik.touched.status && formik.errors.status}
                                onChange={(e) => { formik.setFieldValue("status", e.target.value) }}
                            >
                                <MenuItem key={0} value={true}>
                                    Ativo
                                </MenuItem>
                                <MenuItem key={1} value={false}>
                                    Inativo
                                </MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
                </form>
            </Modal>
        </>
    )
}
