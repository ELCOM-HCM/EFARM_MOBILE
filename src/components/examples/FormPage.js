import React from "react";
import {
  EPage,
  ENavbar,
  EList,
  EELabel,
  EBlockTitle,
  ERow,
  EButton,
  EBlock,
  EListItem,
  EInput,
  ELabel,
  EToggle,
  ERange
} from "../Widget";

export default () => (
  <EPage>
    <ENavbar title="Form" backLink="Back" />
    <EBlockTitle>Form Example</EBlockTitle>
    <EList form>
      <EListItem>
        <ELabel>Name</ELabel>
        <EInput type="text" placeholder="Name" />
      </EListItem>
      <EListItem>
        <ELabel>E-mail</ELabel>
        <EInput type="email" placeholder="E-mail" />
      </EListItem>
      <EListItem>
        <ELabel>URL</ELabel>
        <EInput type="url" placeholder="URL" />
      </EListItem>
      <EListItem>
        <ELabel>Password</ELabel>
        <EInput type="password" placeholder="Password" />
      </EListItem>
      <EListItem>
        <ELabel>Phone</ELabel>
        <EInput type="tel" placeholder="Phone" />
      </EListItem>
      <EListItem>
        <ELabel>Gender</ELabel>
        <EInput type="select">
          <option selected>Male</option>
          <option>Female</option>
        </EInput>
      </EListItem>
      <EListItem>
        <ELabel>Birth date</ELabel>
        <EInput type="date" placeholder="Birth date" value="2014-04-30" />
      </EListItem>
      <EListItem title="Toggle">
        <EToggle slot="after" />
      </EListItem>
      <EListItem>
        <ELabel>Slider</ELabel>
        <EInput>
          <ERange min="0" max="100" value="50" step="1" label={true} />
        </EInput>
      </EListItem>
      <EListItem>
        <ELabel>Textarea</ELabel>
        <EInput type="textarea" placeholder="Bio" />
      </EListItem>
      <EListItem>
        <ELabel>Resizable</ELabel>
        <EInput type="textarea" placeholder="Bio" resizable />
      </EListItem>
    </EList>

    <EBlockTitle>Checkbox group</EBlockTitle>
    <EList form>
      {Array.from(Array(3).keys()).map(n => (
        <EListItem
          key={n}
          checkbox
          name="my-checkbox"
          value={n + 1}
          title={`Checkbox ${n + 1}`}
        />
      ))}
    </EList>

    <EBlockTitle>Radio buttons group</EBlockTitle>
    <EList form>
      {Array.from(Array(3).keys()).map(n => (
        <EListItem
          key={n}
          radio
          name="my-radio"
          checked={n === 0}
          value={n + 1}
          title={`Radio ${n + 1}`}
        />
      ))}
    </EList>

    <EBlockTitle>EButtons</EBlockTitle>
    <EBlock strong>
      <ERow tag="p">
        <EButton className="col">Button</EButton>
        <EButton className="col" fill>
          Fill 
        </EButton>
      </ERow>
      
      <ERow tag="p">
        
        <EButton className="col" raised>
          Raised 
        </EButton>
        
        <EButton className="col" raised fill>
          Raised Fill 
        </EButton>
        
      </ERow>
      
      <ERow tag="p">
        
        <EButton className="col" round>
          Round 
        </EButton>
        
        <EButton className="col" round fill>
          Round Fill 
        </EButton>
        
      </ERow>
      
      <ERow tag="p">
        
        <EButton className="col" outline>
          Outline 
        </EButton>
        
        <EButton className="col" round outline>
          Outline Round 
        </EButton>
        
      </ERow>
      
      <ERow tag="p">
        
        <EButton className="col" small outline>
          Small 
        </EButton>
        
        <EButton className="col" small round outline>
          Small Round 
        </EButton>
        
      </ERow>
      
      <ERow tag="p">
        
        <EButton className="col" small fill>
          Small 
        </EButton>
        
        <EButton className="col" small round fill>
          Small Round 
        </EButton>
        
      </ERow>
      
      <ERow tag="p">
        
        <EButton className="col" big raised>
          Big 
        </EButton>
        
        <EButton className="col" big fill raised>
          Big Fill 
        </EButton>
        
      </ERow>
      
      <ERow tag="p">
        
        <EButton className="col" big fill raised color="red">
          Big Red 
        </EButton>
        
        <EButton className="col" big fill raised color="green">
          Big Green 
        </EButton>
        
      </ERow>
    </EBlock>
  </EPage>
);
