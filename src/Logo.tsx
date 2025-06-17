import iptLogo from "./assets/ipt.svg";

function Logo() {
  return (
    <div>
      <a href="https://google.ch" target="_blank">
        <img src={iptLogo} className="logo" alt="ipt logo test" />
      </a>
    </div>
  );
}

export default Logo;
