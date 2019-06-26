/* eslint-disable */
const React = require('react')
const Uppy = require('@uppy/core')
const Tus = require('@uppy/tus')
const GoogleDrive = require('@uppy/google-drive')
const { Dashboard, DashboardModal, DragDrop, ProgressBar } = require('@uppy/react')
import { Icon, Input, AutoComplete } from 'antd';
import 'antd/dist/antd.css';

const { Option, OptGroup } = AutoComplete;

const dataSource = [
  {
    title: 'Kinder Morgan',
    children: [
      {
        title: 'Gulf Coast Express',
        id: '278867.0000.0000'
      }
    ]
  },
  {
    title: 'New York State Energy Research',
    children: [
      {
        title: 'NYSERDA Multifamily',
        id: '114810.0000.0000',
      }
    ]
  },
  {
    title: 'West Texas Swogp',
    children: [
      {
        title: 'West Texas Swogp',
        id: '117781.0000.0000',
      },
    ],
  },
];

function renderTitle(title) {
  return (
    <span>
      {title}
      <a
        style={{ float: 'right' }}
        href="#"
        target="_blank"
        rel="noopener noreferrer"
      >
        more
      </a>
    </span>
  );
}

const options = dataSource
  .map(group => (
    <OptGroup key={group.title} label={renderTitle(group.title)}>
      {group.children.map(opt => (
        <Option key={opt.title} value={opt.title}>
          {opt.title}
          <span className="certain-search-item-count">{opt.id}</span>
        </Option>
      ))}
    </OptGroup>
  ))
  .concat([
    <Option disabled key="all" className="show-all">
      <a href="#" target="_blank" rel="noopener noreferrer">
        View all projects
      </a>
    </Option>,
  ]);



class Upload extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      showInlineDashboard: false,
      open: false
    }

    this.uppy = new Uppy({ id: 'uppy1', autoProceed: true, debug: true,
      restrictions: {
        maxFileSize: 10000000,
        maxNumberOfFiles: 1,
        minNumberOfFiles: 1
      }
     })
      .use(Tus, { endpoint: 'https://master.tus.io/files/' })
      .use(GoogleDrive, { companionUrl: 'https://companion.uppy.io' })

    this.uppy2 = new Uppy({ id: 'uppy2', autoProceed: false, debug: true })
      .use(Tus, { endpoint: 'https://master.tus.io/files/' })

    this.handleModalClick = this.handleModalClick.bind(this)
  }

  componentWillUnmount () {
    this.uppy.close()
    this.uppy2.close()
  }

  handleModalClick () {
    this.setState({
      open: !this.state.open
    })
  }

  render () {
    const { showInlineDashboard } = this.state
    return (
    <div>
     <div className="certain-category-search-wrapper">
      <AutoComplete
        className="certain-category-search"
        dropdownClassName="certain-category-search-dropdown"
        dropdownMatchSelectWidth={false}
        dropdownStyle={{ width: 300 }}
        size="large"
        style={{ width: '100%' }}
        dataSource={options}
        placeholder="select projects"
        optionLabelProp="value"
      >
        <Input suffix={<Icon type="search" className="certain-category-icon" />} />
      </AutoComplete>
    </div>
      <div className="mainUpload">
        <h2>Shapefile Upload</h2>
        <h3>Drag Drop Area</h3>
        <DragDrop
          uppy={this.uppy}
          plugins={['GoogleDrive', 'Dropbox']}
          locale={{
            strings: {
              chooseFile: 'Boop a file',
              orDragDrop: 'or yoink it here'
            }
          }}
        />
        <ProgressBar
          uppy={this.uppy}
          hideAfterFinish={false}
        />
        <a href='https://trcdigitalapp0228.appspot.com/' id='editshape'>Edit Your Shape</a>
      </div>
      </div>
    )
  }
}


export default Upload;