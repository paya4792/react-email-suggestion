import React, { InputHTMLAttributes, Ref, useState } from "react";
import { isZenkaku, zenkakuToHankaku } from "./utils";

const domainList = [
  'yahoo.co.jp',
  'gmail.com',
  'ezweb.ne.jp',
  'au.com',
  'docomo.ne.jp',
  'i.softbank.jp',
  'softbank.ne.jp',
  'excite.co.jp',
  'googlemail.com',
  'hotmail.co.jp',
  'hotmail.com',
  'icloud.com',
  'live.jp',
  'me.com',
  'mineo.jp',
  'nifty.com',
  'outlook.com',
  'outlook.jp',
  'yahoo.ne.jp',
  'ybb.ne.jp',
  'ymobile.ne.jp',
];

type EmailProps = {
  name?: string;
  domains?: string[];
  alwaysVisible?: boolean;
  minChars?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  maxSuggestions?: number;
  onChange?: ( value: string ) => void;
  inputRef?: Ref<HTMLInputElement>;
  emailClassName?: string;
  emailInputClassName?: string;
  dropdownUlClassName?: string;
  dropdownLiClassName?: string;
  dropdownSpanClassName?: string;
} & InputHTMLAttributes<HTMLInputElement>


export const Email = (
  {
    name = 'email',
    domains = domainList,
    alwaysVisible = false,
    minChars = 0,
    maxSuggestions = 5,
    onChange,
    inputRef,
    emailClassName,
    emailInputClassName,
    dropdownUlClassName,
    dropdownLiClassName,
    dropdownSpanClassName,
    ...inputAttributes
  }: EmailProps
) => {
  // states
  const [ email, setEmail ] = useState( '' );
  const [ isFocused, setIsFocused ] = useState( false );

  // 分解したメールアドレス
  const userText = email.split( '@' )[ 0 ];
  const haveAt = !!( email.split( '@' ).length - 1 !== 0 );
  const domainText = email.split( '@' )[ 1 ] || '';

  // ドメインリストから絞り込んだサジェストのリスト(string[])
  const suggestions: string[] = domains.filter( ( domain ) =>
    domain.toLowerCase().startsWith( domainText.toLowerCase() )
  ).slice( 0, maxSuggestions )

  // サジェストを表示するかどうか
  const dropdownVisible = !!(
    // inputにフォーカスが当たってるときのみ表示
    isFocused &&
    ( // 常に表示する場合: メールアドレスの先頭からの文字数が既定を超えていれば表示
      // 常に表示しない場合: メールアドレスの　からの文字数が既定を超えていれば表示
      alwaysVisible ?
        userText.length >= minChars :
        haveAt && domainText.length >= minChars
    ) &&
    // サジェストリストが無ければ表示しない
    !!suggestions.length )

  const _onChange = ( v: string ) => {
    if ( typeof onChange === 'function' ) onChange( v );
  }

  // サジェストクリック時の動作
  const handleClickSuggest = ( domain: string ) => {
    const completedEmail = userText + '@' + domain;
    setEmail( completedEmail );
    _onChange( completedEmail );
  }

  const handleEmailFocus = () => {
    setIsFocused( true );
  }

  const handleEmailChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    const email = e.target.value
    _onChange( email );
    setEmail( email );
  }

  const handleEmailBlur = () => {
    if ( isZenkaku( email ) ) setEmail( zenkakuToHankaku( email ) );
    setIsFocused( false );
  }

  return (
    <div className={ emailClassName }>
      <input
        { ...inputAttributes }
        ref={ inputRef }
        name={ name }
        inputMode="email"
        value={ email }
        onFocus={ handleEmailFocus }
        onChange={ ( e ) => handleEmailChange( e ) }
        onBlur={ handleEmailBlur }
        className={ emailInputClassName }
      />
      { dropdownVisible && (
        <ul className={ dropdownUlClassName }>
          { suggestions.map( ( item ) => (
            <li
              key={ item }
              onTouchEnd={ () => handleClickSuggest( item ) }
              onMouseDown={ () => handleClickSuggest( item ) }
              className={ dropdownLiClassName }
            >
              <span className={ dropdownSpanClassName }>
                { userText }@{ item }
              </span>
            </li>
          ) ) }
        </ul>
      ) }
    </div>
  )
}
