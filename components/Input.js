export default function InputComp({type, placeholder, value, onChange, name}) {
    return <input type={`${type}`}
                  placeholder={`${placeholder}`}
                  value={`${value}`}
                  onChange={onChange}
                  name={`${name}`}
                  className={`bg-zinc-900 outline-none mt-6 ml-4 pl-6 pr-3 pt-4 pb-4 rounded-3xl w-2/4 placeholder: text-zinc-600 font-semibold `}/>

}