import React from "react";
import { SingleEntryPlugin } from "webpack";
import { SetErrorMsg } from "../mediauploader/components/globalstateContext";
import { ErrorHandler, Endpoint, Identity } from "./contexts";

import { NFTable } from "./nfTable";

function closeAfterAni(
  element,
  callBack,
  toggleAniCleanUp,
  setToggleAniCleanUp
) {
  if (toggleAniCleanUp) {
    element.style.animationName = "slideIn";
    element.removeEventListener("animationend", function (e) {
      callBack();
      setToggleAniCleanUp((a) => !a);
    });
  } else {
    element.style.animationName = "slideOut";
    element.addEventListener("animationend", function (e) {
      callBack();
      setToggleAniCleanUp((a) => !a);
    });

    setToggleAniCleanUp((a) => !a);
  }
}

export function NetforumSelector({
  itemKey,
  typeEndpoint,
  selectEndpoint,
  token,
  close,
  toggleEditable,
  refetchData,
}) {
  const errorHandler = React.useContext(ErrorHandler);
  const endHandler = React.useContext(Endpoint);
  const [nfTypes, setNfTypes] = React.useState([]);
  const [selectedType, setSelectedType] = React.useState("f");
  const [nfOptions, setNfOptions] = React.useState([]);
  const [nfSelction, setNfSelection] = React.useState([]);
  const [validSearch, setValidSearch] = React.useState(false);
  const [toggleAniCleanUp, setToggleAniCleanUp] = React.useState(false);
  const [NfLinkInfo, setNFlinkInfo] = React.useState({ code: "", key: "" });

  // set up refs for the three fields that will be used

  const nfTypeRef = React.useRef();
  const nfSearchTextRef = React.useRef();
  const nfItemRef = React.useRef();
  const slideAnimationRef = React.useRef();
  // get contexts
  const identity = React.useContext(Identity);
  const handlerError = React.useContext(ErrorHandler);
  function postLink({ key, nfKey, nfType, nfCode }) {
    alert("WORKS");
    fetch(
      `https://localhost:44340/api/v1/Medias/${key}/netforumItemLink?netForumKey=${nfKey}&netForumType=${nfType}&netForumCode=${nfCode}&username=${
        identity.profile.given_name || "guest"
      }`,

      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }
    ).then(function (res) {
      if (res.status === 400) {
        handlerError("netforum link bad");
      }
      if (res.status === 200) {
        refetchData((d) => !d);
        toggleEditable(false);
      }
    });
  }

  const onchange = function (type, search) {
    console.log("HANDLER ", type, selectedType, nfTypes);

    if (search.length > 2 && type.length > 0) {
      setValidSearch(true);
      fetch(
        `https://localhost:44340/api/v0/NetforumItems/NetForumItems?netForumType=${type}&searchText=${encodeURI(
          search
        )}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          setNfOptions(res.Result.NetforumItemDtos);
          setNFlinkInfo([
            res.Result.NetforumItemDtos[0].NetforumKey,
            res.Result.NetforumItemDtos[0].NetforumCode,
          ]);
        })
        .catch((err) => {
          console.log("RETURN ITEMS", err);
          errorHandler("error fetching types");
        });
    } else {
      setValidSearch(false);
    }
  };
  React.useEffect(
    function () {
      fetch(typeEndpoint + "ContentTypes", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(function (res) {
          if (res.status === 401) {
            throw new Error("Network Error, probably unauthorised");
          }
          return res.json();
        })
        .then((res) => {
          res.Result.NetforumContentTypes.forEach((el, ind, arr) => {
            setNfTypes((t) => [...t, el.NetforumType]);
          }).catch((err) => SetErrorMsg(err));
        });
    },
    [typeEndpoint]
  );

  React.useEffect(
    function () {
      setSelectedType(nfTypes[0]);
      console.log("mmmm link", slideAnimationRef.current.style.aninationName);
      setNFlinkInfo(nfItemRef.current.value);
    },
    [nfTypes]
  );
  console.log("selection", nfTypes, selectedType);
  return (
    <div ref={slideAnimationRef} className="netforum-selector">
      <div
        className="toggle-inputbox"
        onClick={(e) => {
          closeAfterAni(
            slideAnimationRef.current,
            close,
            toggleAniCleanUp,
            setToggleAniCleanUp
          );
        }}
      >
        close..
      </div>
      <div>
        <div>Type</div>
        <select
          ref={nfTypeRef}
          onChange={(e) => {
            e.stopPropagation();
            //setSelectedType(e.target.value);
            onchange(e.target.value, nfSearchTextRef.current.value);
          }}
        >
          {nfTypes.map((el) => (
            <option value={el}>{el}</option>
          ))}
        </select>
      </div>
      <div>
        <div>Keyword</div>
        <input
          ref={nfSearchTextRef}
          autofocus="true"
          className={validSearch ? "valid-input" : "invalid-input"}
          type="text"
          onChange={(e) => {
            e.stopPropagation();
            onchange(nfTypeRef.current.value, e.target.value);
          }}
        />
        <div>Select</div>
        <select
          ref={nfItemRef}
          onChange={(e) => {
            e.stopPropagation();
            let splitInfo = e.target.value.split(",");
            setNFlinkInfo(splitInfo);
          }}
        >
          {nfOptions.map((el) => (
            <option value={[el.NetforumKey, el.NetforumCode]}>
              {el.NetforumCode}
            </option>
          ))}
        </select>
        <button
          disabled={!validSearch}
          onClick={(e) => {
            postLink({
              key: itemKey,
              nfKey: NfLinkInfo[0],
              nfCode: NfLinkInfo[1],
              nfType: nfTypeRef.current.value,
            });
          }}
        >
          Add
        </button>
        <NFTable options={nfOptions} />
      </div>
    </div>
  );
}
