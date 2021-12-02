import React from "react";
import {compose} from "redux";
import {withAuthRedirect} from "../../HOCs/withAuthRedirect";
import {connect} from "react-redux";
import Preloader from "../../common/Preloader/Preloader";
import {getTracks, searchResult} from "../../redux/musicReducer";
import s from "./Music.module.sass";
import {Field, reduxForm} from "redux-form";

const SearchReduxForm = (props) => {
   return (
      <form onSubmit={props.handleSubmit}>
         <Field name="search" component={"input"} type={"text"} placeholder="Бьянка"/>
         {/*<input type="text" value={props.searchResult} onChange={props.searchChange}/>*/}
         <button>Search</button>
      </form>
   )
}
const SearchForm = reduxForm({form: 'search'})(SearchReduxForm)

//Hooks=======================================
// const CustomTextarea = ({label, ...props}) => {
//     const [feild, meta] = useField(props);
//     return (
//        <>
//            {/*<label htmlFor={props.id || props.name}>{label}</label>*/}
//            <input {...feild} {...props}  />
//            {meta.touched && meta.error ? (
//               <div className={style.error}>{meta.error}</div>
//            ) : null}
//        </>
//     )
// }
// const SearchForm = (props) => {
//     return (
//        <>
//            <Formik initialValues={{
//                search: ''
//            }}
//                    validationSchema={Yup.object({
//                        search: Yup.string()
//                           .max(30, 'Must be 30 characters or less'),
//                    })
//                    }
//                    onSubmit={(values, {setSubmitting, resetForm}) => {
//                        setTimeout(() => {
//                            props.onSubmit(values)
//                            // resetForm();
//                            setSubmitting(false);
//                        }, 200)
//                    }}
//            >
//                {props => (
//                   <Form onSubmit={props.handleSubmit}>
//                       <CustomTextarea name="search"
//                                       type="text"
//                       />
//                       <button type="submit"
//                               disabled={props.isSubmitting}
//                       >
//                           {props.isSubmitting ? 'Wait...' : 'Search'}
//                       </button>
//                   </Form>
//                )}
//            </Formik>
//        </>
//     )
// }
//Hooks=======================================


class MusicContainer extends React.Component {
   componentDidMount() {
      this.props.getTracks();
   }

   onSubmit = (values) => {
      this.props.searchResult(values.search)
   }
   render() {
      return (
         <>
            {this.props.isFetching
               ? <Preloader/>
               : <div className={s.wrapperContent}>
                  <div className={s.searchItem}>
                     <SearchForm onSubmit={this.onSubmit}/>
                  </div>
                  <div className={s.wrappTracks}>
                     {!this.props.radioChannel
                        ? <Preloader/>
                        : this.props.radioChannel.map(r =>
                        <div key={r.id} className={s.track}>
                           <div>
                              <a href={r.link}>PLAY</a>
                           </div>
                           <div><img src={r.artist.picture} alt=""/></div>
                           <div>
                              <a href={r.preview}>PREV</a>
                           </div>
                           <div>{r.artist.name}</div>
                           <div>{r.title}</div>
                        </div>)}
                  </div>
               </div>}
         </>
      )
   }
}

const mapStateToProps = (state) => ({
   isFetching: state.musicReducer.isFetching,
   radioChannel: state.musicReducer.radioChannel,
   searchResult: state.musicReducer.searchResult
})
export default compose(
   connect(mapStateToProps, {getTracks, searchResult}),
   withAuthRedirect
)(MusicContainer);