import { useRef, useState } from 'react'
import './contactus.css'
import emailjs from '@emailjs/browser';
import { faL } from '@fortawesome/free-solid-svg-icons';

const Contactus = () => {

    const [email, setemail] = useState('')
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const [accept, setAccept] = useState(false)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState('')
    const form = useRef();
    const sendEmail = async (e) => {
        e.preventDefault();
        let flage = true;
        setAccept(true)
        setLoading(true)
        if (email !== "" && name !== '' && message !== '') {
            flage = true;
        } else flage = false;
        try {
            if (flage) {
                emailjs.sendForm('service_5qhb8wa',
                    'template_bqxj7l1',
                    form.current,
                    's8d_HsS8GsbrNNZvN')
                    .then((result) => {
                        console.log(result)
                    }
                    ).finally(
                        setAccept(false),
                        setSuccess(' تم ارسال رسالتك بنجاح, شكرا لك.'),
                        setemail(''),
                        setMessage(''),
                        setName(''),
                    )
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    };

    return (
        <div className='maincart'>
            <div className='container'>
                <form onSubmit={sendEmail} ref={form} className='contact-form'>
                    <h2 className='contact-title text-center'> تواصل معنا</h2>
                    <p style={{ fontSize: "14px" }} className='mb-1 text-center text-body-tertiary'>للشكاوة او المقترحات</p>
                    <p style={{ fontSize: "14px" }} className='mb-2 text-center text-body-tertiary'>هذه الرسالة سوف ترسل لنا علي هذا الايميل mahmoud.tamer.developer@gmail.com</p>
                    <div>
                        <div className=" mb-2">
                            <label className='mb-3 label-conatact' htmlFor="">اسمك :</label>
                            <input
                                value={name}
                                name="user_name"
                                type="text"
                                className="form-control"
                                id=""
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        {accept && name == "" && <p className='contact-error-message mb-2'>من فضلك ادخل هذا الحقل</p>}
                        <div className="mb-2 ">
                            <label className=' mb-3 label-conatact' >البريد الاليكتروني :</label>
                            <input
                                value={email}
                                name="user_email"
                                type="email"
                                className="w-100 form-control"
                                placeholder="name@example.com"
                                onChange={(e) => setemail(e.target.value)}
                            />
                        </div>
                        {accept && email == "" && <p className='contact-error-message mb-2'>من فضلك ادخل هذا الحقل</p>}
                        <div className='form-flating'>
                            <label className='mb-3 label-conatact'>رسالتك :</label>
                            <textarea
                                value={message}
                                name="message"
                                className="w-100 form-control"
                                placeholder="Leave a comment here"
                                onChange={(e) => setMessage(e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                    {accept && message == "" && <p className='contact-error-message mb-2'>من فضلك ادخل هذا الحقل</p>}
                    <div className='mt-4'>
                        <button disabled={loading} type='submit'>ارسال</button>
                    </div>
                    {
                        success != '' && <div className="mt-2 alert alert-success" role="alert">
                            {success}
                        </div>
                    }
                </form>
            </div >
        </div >
    )
}

export default Contactus