
const useGenereUrl =(props) =>{
    console.log(props);
    if(props.val < 1) return'';
    const genresIdUrl = props.val.map((item) => item.id).toString();
    return genresIdUrl;

    

}
export default useGenereUrl;