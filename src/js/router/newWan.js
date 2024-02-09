const idXval = (el, val) => document.getElementById(el).value = val;
const BoxCheck = (ele, check = true) => document.getElementById(ele).checked = check
function BindingOpt() {
    const Opt = [1, 2, 3, 4, 9, 13];
    for (let i = 0; i < Opt.length; i++) { BoxCheck("IPv4BindLanList" + Opt[i].toString()); }
}
document.getElementById("Newbutton").click();
BoxCheck("WanSwitch")
idXval("ProtocolType", "IPv4");
idXval("WanMode", "IP_Routed");
idXval("ServiceList", "VOIP_INTERNET");
BoxCheck("VlanSwitch")
idXval("VlanId", "10");
idXval("PriorityPolicy", "Specified");
idXval("VlanPriority", "0");
idXval("IPv4MXU", "1500");
BindingOpt();
idXval("IPv4NatType", "1")
document.getElementById("ButtonApply").click();