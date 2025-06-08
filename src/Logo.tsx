import iptLogo from "./assets/ipt.svg";

function Logo() {
  return (
    <div>
      <a href="https://ipt.ch" target="_blank">
        <img src={iptLogo} className="logo" alt="ipt logo" />
      </a>
    </div>
  );
}

export default Logo;
