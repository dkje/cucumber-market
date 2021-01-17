import { NextPage } from "next";
import React from "react";
import Link from "next/link";
import { InitialProps } from "../pages/_app";

interface HeaderProps extends InitialProps {}

const Header: NextPage<HeaderProps> = ({ currentUser }) => {
  const links = [
    !currentUser && { label: "회원가입", href: "/auth/signup" },
    !currentUser && { label: "로그인", href: "/auth/signin" },
    currentUser && { label: "로그아웃", href: "/auth/signout" },
  ]
    .filter((linkConfig) => linkConfig)
    .map((link) => {
      if (link) {
        return (
          <li key={link.label}>
            <Link href={link.href}>
              <a className="nav-link">{link.label}</a>
            </Link>
          </li>
        );
      }
    });

  return (
    <nav className="navbar navbar-light bg-light">
      <Link href="/">
        <a className="navbar-brand">Cucumber-Market</a>
      </Link>
      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">{links}</ul>
      </div>
    </nav>
  );
};

export default Header;
