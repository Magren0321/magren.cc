export default function ChexkBox({ checked } : {checked: boolean}){
  return (
    <input type="checkbox"  defaultChecked={checked} disabled className="mr-1"/>
  )
}
