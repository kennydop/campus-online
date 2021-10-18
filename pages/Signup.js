/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { UserIcon, MailIcon, LockClosedIcon, PhotographIcon, AcademicCapIcon} from "@heroicons/react/outline";
import AuthLeft from "../components/AuthLeft";
import {useRouter} from 'next/router';
import { useAuth } from "../contexts/AuthContext";


function Signup() {
	const { signup, loginWithProvider } = useAuth()
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setpassword] = useState("");
	const [error, setError] = useState();
	const [signUpLoading, setSignUpLoading] = useState(false);
	const router = useRouter();

	async function registerWithEmail () {
		setError('');
		setSignUpLoading(true);
		if(!name){
			setError("Please enter a Username");
			setSignUpLoading(false)
		}
		else if(!email){
			setError("Please enter your Email");
			setSignUpLoading(false);
		}
		else if(!password){
			setError("Please enter a Password");
			setSignUpLoading(false);
		}
		else{
			try{
				await signup(email, password, name)
				router.replace('/addprofileimg')
			}
			catch(error){
				switch (error.code) {
					case 'auth/network-request-failed':
						setError('Please check your internet connection')
					break;
					case "auth/invalid-email":
						setError('Invalid Email')
					break;
					default:
						setError('Unable to create account, try again please')
					console.log(error)
					break;
				}
			}
			setSignUpLoading(false);
		}
	}
	
	async function loginWithSocials(pvd){
		try{
			router.replace('/')
			await loginWithProvider(pvd)
		}catch(error){
			switch (error.code) {
			case 'auth/network-request-failed':
				setError('Please check your internet connection')
				break;
			default:
				setError('Unable to login, try again please')
				console.log(error)
				break;
			}
		}
	}

	return (
		<div className="w-screen flex justify-center items-center bg-blue-grey-50 dark:bg-bdark-200 overflow-auto">
			<AuthLeft/>
			<div className = "flex h-screen self-center w-screen lg:w-2/5 items-center justify-center bg-white dark:bg-bdark-100 lg:bg-transparent dark:lg:bg-transparent">
				<form autoComplete='on' className="authForm">
					<div className="mb-4" >
						<svg xmlns="http://www.w3.org/2000/svg" width="187.676" height="35.77" viewBox="0 0 187.676 35.77">
						<g id="Group_1" data-name="Group 1" transform="translate(-2.324 0)">
						<path id="Exclusion_1" data-name="Exclusion 1" d="M78,34.77H-3a7.008,7.008,0,0,1-7-7V6A7.008,7.008,0,0,1-3-1H78a7.008,7.008,0,0,1,7,7V27.77A7.007,7.007,0,0,1,78,34.77ZM76.7,22a.491.491,0,0,0-.41.241,2.9,2.9,0,0,1-1.155,1.237c-.262.17-.4.327-.4.467a.324.324,0,0,0,.061.228,2.576,2.576,0,0,0,.274.212,2.432,2.432,0,0,1,.676.472,4.067,4.067,0,0,1,.479.729.59.59,0,0,0,.471.319c.15,0,.3-.117.437-.349a2.871,2.871,0,0,1,1.191-1.171.442.442,0,0,0,.257-.38.427.427,0,0,0-.052-.241.9.9,0,0,0-.325-.2,3.391,3.391,0,0,1-.979-.98.87.87,0,0,0-.136-.346A.43.43,0,0,0,76.7,22ZM7.045,5.408A10.357,10.357,0,0,0,1.913,6.77a10.74,10.74,0,0,0-3.883,3.694A9.439,9.439,0,0,0-3.43,15.549a10.126,10.126,0,0,0,.644,3.474A10.912,10.912,0,0,0-.833,22.331a9.689,9.689,0,0,0,3.171,2.452,9.443,9.443,0,0,0,4.178.908A10.659,10.659,0,0,0,11.942,24.3a10.145,10.145,0,0,0,5.093-8.809,10,10,0,0,0-.848-4.118,9.7,9.7,0,0,0-2.271-3.2,10.6,10.6,0,0,0-3.224-2.036A9.723,9.723,0,0,0,7.045,5.408Zm61.137,8.34a4.081,4.081,0,0,0-1.741.651,6.163,6.163,0,0,0-2.074,2.081,6.537,6.537,0,0,0-.923,3.6,6.168,6.168,0,0,0,1.21,3.754,3.979,3.979,0,0,0,3.376,1.634,8.415,8.415,0,0,0,4.677-1.892l-.273-.364a6.712,6.712,0,0,1-1.711.923,4.607,4.607,0,0,1-1.453.257,3.462,3.462,0,0,1-2.815-1.529,4.589,4.589,0,0,1-.81-1.581,11.621,11.621,0,0,1-.28-2.2l7.568-1.635-.031-.56a.618.618,0,0,1-.7-.378,4.776,4.776,0,0,0-1.174-1.7,3.887,3.887,0,0,0-1.438-.841A4.964,4.964,0,0,0,68.182,13.748ZM36.016,25.222c.679,0,2.024.071,4,.212v-.576a8.819,8.819,0,0,1-1.378-.265c-.512-.135-.818-.336-.908-.6A36.219,36.219,0,0,1,37.5,18.2l.121-7.276a33.248,33.248,0,0,1,.59-6.474h-.455a23.608,23.608,0,0,1-4.085,2.051v.477l.022,0,.176-.027.172-.027.026,0a2.209,2.209,0,0,1,.29-.014,1.188,1.188,0,0,1,1.037.378c.273.37.411,1.9.411,4.552,0,1.264-.025,2.709-.076,4.295-.05,1.569-.106,3-.166,4.243-.06,1.226-.116,2.023-.167,2.367a2.528,2.528,0,0,1-.59,1.482,2.925,2.925,0,0,1-1.6.68v.469A27.047,27.047,0,0,1,36.016,25.222Zm9.022-11.806A10.5,10.5,0,0,1,41.512,15.4a.3.3,0,0,0-.273.3c0,.081.234.147.7.2a2.026,2.026,0,0,1,.756.151,1.6,1.6,0,0,1,.266.832c.045.4.067,1.329.067,2.755,0,.11-.013.607-.038,1.476s-.058,1.636-.1,2.255a4.42,4.42,0,0,1-.136,1.082c-.111.221-.6.374-1.453.454l-.06.469,6.1-.151-.182-.439a9.638,9.638,0,0,0-1.059-.091,2.868,2.868,0,0,1-.727-.121.628.628,0,0,1-.3-.348,10.168,10.168,0,0,1-.189-1.914c-.035-.924-.053-1.655-.053-2.173,0-.679.023-1.463.068-2.331s.1-1.728.174-2.513a13.093,13.093,0,0,1,.257-1.816A.977.977,0,0,0,45.038,13.415ZM59.251,25.131a16.882,16.882,0,0,1,2.633.182l-.03-.469a7.758,7.758,0,0,0-.772-.2,2.225,2.225,0,0,1-.772-.257,6.464,6.464,0,0,1-.2-2.331v-3.6a14.714,14.714,0,0,0-.159-2.414,2.768,2.768,0,0,0-.831-1.56,3.026,3.026,0,0,0-2.138-.643,5.885,5.885,0,0,0-2.055.4A20.443,20.443,0,0,0,52.2,15.58a12.011,12.011,0,0,0-.061-1.453c-.04-.291-.138-.439-.289-.439a2.777,2.777,0,0,0-.684.305,11.174,11.174,0,0,1-1.147.539,12.044,12.044,0,0,1-1.741.647,1.011,1.011,0,0,1,.031.3,4.935,4.935,0,0,1,1.385.28,1,1,0,0,1,.484.8,15.884,15.884,0,0,1,.113,2.35c0,.838-.015,1.662-.045,2.449a19.681,19.681,0,0,1-.167,2.039,1.559,1.559,0,0,1-.166.574,1.034,1.034,0,0,1-.5.378,5.881,5.881,0,0,1-1.2.318l.031.439h3.324c.644.02,1.18.045,1.593.076s.735.055.956.076l.031-.47a6.486,6.486,0,0,1-1.332-.249.991.991,0,0,1-.507-.326,1.24,1.24,0,0,1-.144-.544c-.061-.558-.081-1.7-.06-3.406l.091-4.027a8.956,8.956,0,0,1,2.309-.893,8.269,8.269,0,0,1,1.465-.2,1.99,1.99,0,0,1,1.6.606,2.778,2.778,0,0,1,.626,1.461,17.277,17.277,0,0,1,.113,2.187c0,.586-.028,1.429-.083,2.5a7.108,7.108,0,0,1-.311,2.112,2.447,2.447,0,0,1-1.711.862v.439C57.384,25.192,58.408,25.131,59.251,25.131Zm-29.441,0a16.882,16.882,0,0,1,2.633.182l-.03-.469a7.758,7.758,0,0,0-.772-.2,2.225,2.225,0,0,1-.772-.257,6.441,6.441,0,0,1-.2-2.331v-3.6a14.738,14.738,0,0,0-.158-2.414,2.768,2.768,0,0,0-.831-1.56,3.026,3.026,0,0,0-2.138-.643,5.885,5.885,0,0,0-2.055.4,20.438,20.438,0,0,0-2.735,1.34,11.911,11.911,0,0,0-.06-1.453c-.04-.291-.138-.439-.289-.439a2.777,2.777,0,0,0-.684.305,11.114,11.114,0,0,1-1.147.539,12,12,0,0,1-1.74.647,1.011,1.011,0,0,1,.031.3,4.935,4.935,0,0,1,1.385.28,1,1,0,0,1,.484.8,15.885,15.885,0,0,1,.113,2.35c0,.814-.015,1.638-.045,2.449a19.909,19.909,0,0,1-.167,2.039,1.573,1.573,0,0,1-.166.574,1.034,1.034,0,0,1-.5.378,5.9,5.9,0,0,1-1.2.318l.031.439h3.323c.644.02,1.181.045,1.594.076s.735.055.956.076l.031-.47a6.469,6.469,0,0,1-1.332-.249.974.974,0,0,1-.507-.326,1.231,1.231,0,0,1-.144-.544c-.061-.555-.081-1.669-.061-3.406l.091-4.027a8.975,8.975,0,0,1,2.31-.893,8.269,8.269,0,0,1,1.465-.2,1.99,1.99,0,0,1,1.6.606,2.778,2.778,0,0,1,.626,1.461,17.276,17.276,0,0,1,.113,2.187c0,.586-.028,1.429-.083,2.5a7.108,7.108,0,0,1-.311,2.112,2.447,2.447,0,0,1-1.711.862v.439C27.944,25.192,28.968,25.131,29.811,25.131ZM44.7,6.088a1.17,1.17,0,0,0-.833.333,1.128,1.128,0,0,0-.348.848A1.189,1.189,0,0,0,44.7,8.45,1.085,1.085,0,0,0,45.53,8.1a1.183,1.183,0,0,0,.326-.833,1.17,1.17,0,0,0-.333-.832A1.093,1.093,0,0,0,44.7,6.088ZM7.816,24.6A7.789,7.789,0,0,1,3.4,23.186a10.255,10.255,0,0,1-3.33-3.776A10.668,10.668,0,0,1-1.175,14.4,8.564,8.564,0,0,1-.16,10.175,7.066,7.066,0,0,1,2.519,7.413a7.143,7.143,0,0,1,3.572-.946,7.412,7.412,0,0,1,3.315.779,8.725,8.725,0,0,1,2.778,2.2,10.552,10.552,0,0,1,1.876,3.292,11.7,11.7,0,0,1,.674,3.965,8.846,8.846,0,0,1-1.014,4.4,6.642,6.642,0,0,1-2.6,2.642A6.885,6.885,0,0,1,7.816,24.6ZM65.4,18.486h0a8.76,8.76,0,0,1,.583-2.572,1.662,1.662,0,0,1,1.612-1.2,2.649,2.649,0,0,1,1.582.484,3.857,3.857,0,0,1,1.037,1.067,1.984,1.984,0,0,1,.363.825c0,.111-.071.192-.211.242s-.467.134-1,.257c-.18.029-.539.106-1.067.227a6.93,6.93,0,0,0-.915.242l-1.982.424Z" transform="translate(105 1)" fill="#e74799"/>
						<path id="Path_1" data-name="Path 1" d="M19.217,22.958q-.076.2-.651,2.24-1.635.484-2.967.749a14.831,14.831,0,0,1-2.891.265,11.162,11.162,0,0,1-3.754-.666,10.34,10.34,0,0,1-3.375-1.975A9.523,9.523,0,0,1,3.2,20.377a10.049,10.049,0,0,1-.878-4.291,9.312,9.312,0,0,1,1.627-5.57A9.7,9.7,0,0,1,8.1,7.17,13.13,13.13,0,0,1,13.3,6.1a11.33,11.33,0,0,1,4.057.742,5.023,5.023,0,0,0,1.362.288q.212-.045.31-.061t.25-.03a.285.285,0,0,1,.2.121l-.227.863a22.34,22.34,0,0,0-.56,2.891.5.5,0,0,1-.363-.189.894.894,0,0,1-.091-.462,2.754,2.754,0,0,0-.257-1.3,4.489,4.489,0,0,0-2.043-1.362,8.32,8.32,0,0,0-3.285-.7,7.238,7.238,0,0,0-6.728,4.253,11.043,11.043,0,0,0-1.022,4.9,10.183,10.183,0,0,0,.9,4.458,8.389,8.389,0,0,0,2.255,2.959,9.235,9.235,0,0,0,2.755,1.574,7.609,7.609,0,0,0,2.429.484,6.04,6.04,0,0,0,2.709-.537,5.063,5.063,0,0,0,1.688-1.287,11.889,11.889,0,0,0,1.188-1.794q.227-.439.394-.439.288,0,.288.272A7.511,7.511,0,0,1,19.217,22.958Zm4.874-5.888-1.862.833a3.3,3.3,0,0,1-.121-.711,1.809,1.809,0,0,1,.946-1.43,8.62,8.62,0,0,1,2.134-1.067,6.164,6.164,0,0,1,1.657-.409,2.1,2.1,0,0,1,1.014.363,5.032,5.032,0,0,1,.969.727,2.824,2.824,0,0,1,.492.6,3.287,3.287,0,0,1,.31.931,7.944,7.944,0,0,1,.136,1.62q0,.288-.076,2.028l-.061,1.135q-.061.817-.061,1.3a5.862,5.862,0,0,0,.167,1.332q.151.727.681.727a4.155,4.155,0,0,0,1.574-.439v.621l-2.225.893a5.081,5.081,0,0,1-.757.227.917.917,0,0,1-.689-.462,3.925,3.925,0,0,1-.552-1.1,9.992,9.992,0,0,1-4.3,1.559,1.75,1.75,0,0,1-1.393-.537,2.393,2.393,0,0,1-.469-1.612,3.571,3.571,0,0,1,.25-1.529,1.776,1.776,0,0,1,.81-.787,10.116,10.116,0,0,1,2.407-.855q1.271-.28,2.664-.477l.076-1.862v-.5a2.783,2.783,0,0,0-.734-2.036,2.331,2.331,0,0,0-1.718-.749,1.936,1.936,0,0,0-.946.265.822.822,0,0,0-.477.749A2.005,2.005,0,0,0,24.091,17.069Zm3.587,7.16q-.045-.5.091-2.846a6.089,6.089,0,0,0-3.2.484q-1.207.621-1.207,1.559a2.429,2.429,0,0,0,.37,1.287,1.14,1.14,0,0,0,1.018.605A8.949,8.949,0,0,0,27.678,24.229Zm4.753,1.8.03-.469a3.5,3.5,0,0,0,1.317-.529,2.2,2.2,0,0,0,.6-1.345,18.84,18.84,0,0,0,.189-3.128,14.208,14.208,0,0,0-.2-2.9,1.556,1.556,0,0,0-.605-1.073,3.26,3.26,0,0,0-1.324-.242v-.507a11.626,11.626,0,0,0,3.315-1.4.587.587,0,0,1,.3-.122q.3,0,.371.787a7.414,7.414,0,0,1,.008,1.377q.318-.182,1.128-.613t1.271-.651a9.971,9.971,0,0,1,1.188-.454,4.221,4.221,0,0,1,1.271-.235,3.045,3.045,0,0,1,1.552.447,2.345,2.345,0,0,1,1.052,1.476,10.771,10.771,0,0,1,4.853-1.483,2.953,2.953,0,0,1,2.123.651,2.808,2.808,0,0,1,.811,1.673,22.618,22.618,0,0,1,.144,2.944v2.694q-.045,1.166-.03,1.6a.881.881,0,0,0,.144.56.834.834,0,0,0,.477.174q.121.015.84.167t.825.167L53.864,26H48.113l-.091-.409a3.534,3.534,0,0,0,1.287-.53,2,2,0,0,0,.492-1.226,25.17,25.17,0,0,0,.144-3.285,10.187,10.187,0,0,0-.235-2.361,2.759,2.759,0,0,0-.84-1.491,2.49,2.49,0,0,0-1.68-.522,7.732,7.732,0,0,0-3.164.833q.076.636.106,2.187t.061,3.194q.03,1.642.045,2.127a1.262,1.262,0,0,0,.136.568.656.656,0,0,0,.4.235q.3.076,1.264.212V26H44.147q-.257,0-1.907.061t-1.968.061l-.091-.469a3.7,3.7,0,0,0,1.438-.522,1.738,1.738,0,0,0,.583-1.15,17.171,17.171,0,0,0,.114-2.808l-.03-1.468a6.22,6.22,0,0,0-.568-2.838,1.857,1.857,0,0,0-1.763-.976,4.009,4.009,0,0,0-1.241.212,9,9,0,0,0-1.241.507q-.59.3-1.014.522-.015.257-.03,1.309t-.03,1.733v1.544q.03,2.709.091,2.952a.819.819,0,0,0,.439.492,5.433,5.433,0,0,0,1.635.4v.53q-.182,0-1.3-.061t-1.332-.061Zm21.979-9.476-.121-.431a9.66,9.66,0,0,1,1.016-.562,5.116,5.116,0,0,0,1.327-.638,5.515,5.515,0,0,0,1.539-1.169,16.785,16.785,0,0,1,.325,2.134l1.3-.515a8.91,8.91,0,0,1,3.073-.848,4.09,4.09,0,0,1,2.263.742,5.645,5.645,0,0,1,1.832,2,5.425,5.425,0,0,1,.7,2.694,5.285,5.285,0,0,1-.833,3.05,5.819,5.819,0,0,1-2.051,1.877,9.334,9.334,0,0,1-2.346.916,8.4,8.4,0,0,1-1.7.257,7.2,7.2,0,0,1-2.24-.439q0,.272-.03,1.707t-.03,1.677v2.75a8.572,8.572,0,0,0,.076,1.375.707.707,0,0,0,.28.521,1.787,1.787,0,0,0,.7.143l1.1.061q.378,0,.378.3,0,.187-.114.233a1.838,1.838,0,0,1-.537.047q-1.877,0-2.346.023t-3.088.189a2.834,2.834,0,0,0-.03-.454,2.608,2.608,0,0,0,1.029-.219,1.07,1.07,0,0,0,.409-.522,10.555,10.555,0,0,0,.318-2.67q.076-2,.076-4.184l.03-1.891q0-2.179-.03-4.5a26.362,26.362,0,0,0-.121-2.837,2.311,2.311,0,0,0-.235-.583,1.539,1.539,0,0,0-.378-.454.715.715,0,0,0-.447-.174A5.285,5.285,0,0,0,54.409,16.555Zm4.057-.045-.03,7.659,1.393.469a8.474,8.474,0,0,0,2.21.53,4.414,4.414,0,0,0,1.65-.371,3.906,3.906,0,0,0,1.6-1.249,3.6,3.6,0,0,0,.689-2.286,6.094,6.094,0,0,0-2.482-4.9,3.55,3.55,0,0,0-2.013-.742A15.744,15.744,0,0,0,58.466,16.509Zm10.626.333v-.628l3.374-1.869.3-.122q.213,0,.213.272l-.189,2.6q-.189,3.088-.189,3.814a7.669,7.669,0,0,0,.453,2.838,2.013,2.013,0,0,0,2.114,1.128,3.719,3.719,0,0,0,1.095-.174,9.906,9.906,0,0,0,1.314-.53q.747-.356,1.17-.568a14.634,14.634,0,0,1,.045-1.477l.091-3.09a8.643,8.643,0,0,0-.091-1.982.984.984,0,0,0-.522-.746,3.857,3.857,0,0,0-1.279-.2l-.03-.583L81,14.587q-.076,1.362-.159,2.6t-.151,2.641q-.068,1.408-.068,2.089A11.273,11.273,0,0,0,80.914,25a5.572,5.572,0,0,0,1.7-.363v.681q-1.716.469-3.478,1.12a12.478,12.478,0,0,1-.412-2.149q-3.7,1.892-5.137,1.892a2.839,2.839,0,0,1-1.934-.922q-.967-.922-.876-3.567l.121-3.4a6.273,6.273,0,0,0-.068-1.383.539.539,0,0,0-.583-.476A3.769,3.769,0,0,0,69.092,16.842ZM83.82,22.594l.53.03a2,2,0,0,0,.492.938,4.888,4.888,0,0,0,1.324,1.173,3.353,3.353,0,0,0,1.816.522,3.609,3.609,0,0,0,1.423-.3,1.274,1.274,0,0,0,.711-1.317,2.18,2.18,0,0,0-.732-1.71,8.22,8.22,0,0,0-1.684-1.1l-1.137-.53a6.614,6.614,0,0,1-1.593-1.09,1.911,1.911,0,0,1-.592-1.453,2.683,2.683,0,0,1,.5-1.461,3.8,3.8,0,0,1,1.449-1.264,4.535,4.535,0,0,1,2.147-.5,21.033,21.033,0,0,1,2.428.227l.5,2.573h-.53a2.167,2.167,0,0,0-.63-1.007,4.676,4.676,0,0,0-1.154-.81,2.614,2.614,0,0,0-1.131-.333,1.767,1.767,0,0,0-1.306.5,1.726,1.726,0,0,0-.5,1.275,1.33,1.33,0,0,0,.366.986,5.225,5.225,0,0,0,1.382.877l.925.437a9.008,9.008,0,0,1,2.154,1.375,2.816,2.816,0,0,1,.895,2.21,3.27,3.27,0,0,1-.22,1.127,1.569,1.569,0,0,1-.66.855,8.534,8.534,0,0,1-2.078,1.037,6.028,6.028,0,0,1-1.668.235,6.961,6.961,0,0,1-.864-.076q-.561-.076-.789-.121t-.789-.212q-.561-.167-.728-.212a5.088,5.088,0,0,0,.121-.863,5.753,5.753,0,0,0-.129-1.037A6.421,6.421,0,0,0,83.82,22.594Z" transform="translate(0 1)" fill="#e74799"/>
						</g>
						</svg>

					</div>
					{error && <p className = "errorMsg" id = "injectError">{error}</p>}
					<div>
						<UserIcon className="infoicons"/>
						<input
						value={name}
						onChange={e=> setName(e.target.value)}
						type="text"
						placeholder="Create Username"
						autoComplete="name"
						className="infofield"
					/>
					</div>
					<div>
						<MailIcon className="infoicons"/>
						<input
						value={email}
						onChange={e=> setEmail(e.target.value)}
						type="text"
						placeholder="Enter Email"
						autoComplete="email"
						className="infofield"
						/>
					</div>
					<div>
						<LockClosedIcon className="infoicons"/>
						<input
						value={password}
						onChange={e=> setpassword(e.target.value)}
						type="password"
						placeholder="Create Password"
						autoComplete="new-password"
						className="infofield"/>
					</div>
					<p className="self-center mb-6 text-sm text-gray-500 dark:text-gray-400">Already have an account? <a className = "text-pink-500 hover:font-bold cursor-pointer" onClick={()=>{router.push('/')}}>Login</a></p>
					<button disabled={signUpLoading} className="infobutton prevent-default" type = "button" onClick={registerWithEmail}>
						{signUpLoading ? <div className="loader mx-auto animate-spin"></div> : <>Sign Up</>}
					</button>
					<div className = "flex flex-col mt-5 items-center justify center">
						<p className = "self-center text-gray-500 dark:text-gray-400"> Or Signup with</p>
						<div className = "flex items-center justify center">
							<div className="mx-4 cursor-pointer hover:translate-y-0.5 transform transition-all duration-500;" onClick={() => loginWithSocials("facebook")}>
								<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"/><path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"/></svg>
							</div>
							<div className="mx-4 cursor-pointer hover:translate-y-1 transform transition-all duration-500;" onClick={() => loginWithSocials("twitter")}>
								<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="-44.7006 -60.54775 387.4052 363.2865"><path fill="#1da1f2" d="M93.719 242.19c112.46 0 173.96-93.168 173.96-173.96 0-2.646-.054-5.28-.173-7.903a124.338 124.338 0 0030.498-31.66c-10.955 4.87-22.744 8.148-35.11 9.626 12.622-7.57 22.313-19.543 26.885-33.817a122.62 122.62 0 01-38.824 14.841C239.798 7.433 223.915 0 206.326 0c-33.764 0-61.144 27.381-61.144 61.132 0 4.798.537 9.465 1.586 13.941-50.815-2.557-95.874-26.886-126.03-63.88a60.977 60.977 0 00-8.279 30.73c0 21.212 10.794 39.938 27.208 50.893a60.685 60.685 0 01-27.69-7.647c-.009.257-.009.507-.009.781 0 29.61 21.075 54.332 49.051 59.934a61.218 61.218 0 01-16.122 2.152 60.84 60.84 0 01-11.491-1.103c7.784 24.293 30.355 41.971 57.115 42.465-20.926 16.402-47.287 26.171-75.937 26.171-4.929 0-9.798-.28-14.584-.846 27.059 17.344 59.189 27.464 93.722 27.464"/></svg>
							</div>
							<div className="mx-4 cursor-pointer hover:translate-y-1 transform transition-all duration-500;" onClick={() => loginWithSocials("google")}>
								<img src="https://img.icons8.com/color/48/000000/google-logo.png"/>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Signup