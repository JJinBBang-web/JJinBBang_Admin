import { useState } from 'react';
import { Button, Input, Modal, Switch, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface ForbiddenWord {
  key: string;
  word: string;
  registeredAt: string;
  isActive: boolean;
}

const initialWords: ForbiddenWord[] = [
  { key: '1', word: '[욕설1]', registeredAt: '2025-12-01', isActive: true },
  { key: '2', word: '[욕설2]', registeredAt: '2026-01-14', isActive: true },
  { key: '3', word: '[비방어]', registeredAt: '2026-02-08', isActive: true },
  { key: '4', word: '[광고문구]', registeredAt: '2026-03-22', isActive: false },
  { key: '5', word: '[도배문구]', registeredAt: '2026-04-05', isActive: true },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export const ForbiddenWordModal = ({ open, onClose }: Props) => {
  const [words, setWords] = useState<ForbiddenWord[]>(initialWords);
  const [newWord, setNewWord] = useState('');

  const addWord = () => {
    if (!newWord.trim()) return;
    const today = new Date().toISOString().split('T')[0];
    setWords(prev => [
      ...prev,
      { key: Date.now().toString(), word: newWord.trim(), registeredAt: today, isActive: true },
    ]);
    setNewWord('');
  };

  const toggleActive = (key: string, isActive: boolean) => {
    setWords(prev => prev.map(w => (w.key === key ? { ...w, isActive } : w)));
  };

  const deleteWord = (key: string) => {
    setWords(prev => prev.filter(w => w.key !== key));
  };

  const columns: ColumnsType<ForbiddenWord> = [
    {
      title: '단어',
      dataIndex: 'word',
      key: 'word',
      render: (word: string) => (
        <span className="font-bold text-text-primary text-[13px]">{word}</span>
      ),
    },
    {
      title: '등록일',
      dataIndex: 'registeredAt',
      key: 'registeredAt',
      render: (date: string) => (
        <span className="text-text-muted text-[13px]">{date}</span>
      ),
    },
    {
      title: '활성',
      dataIndex: 'isActive',
      key: 'isActive',
      align: 'center',
      width: 90,
      render: (isActive: boolean, record) => (
        <Switch
          checked={isActive}
          onChange={val => toggleActive(record.key, val)}
          size="small"
          style={isActive ? { background: '#2f6df0' } : undefined}
        />
      ),
    },
    {
      title: '삭제',
      key: 'delete',
      align: 'center',
      width: 70,
      render: (_, record) => (
        <button
          onClick={() => deleteWord(record.key)}
          className="text-text-disabled hover:text-danger transition-colors text-base cursor-pointer"
        >
          🗑
        </button>
      ),
    },
  ];

  return (
    <Modal
      title={
        <div className="pb-1">
          <div className="text-[17px] font-bold text-text-primary leading-tight">
            금칙어 사전 관리
          </div>
          <div className="text-[13px] text-text-muted font-normal mt-1.5">
            등록된 단어가 리뷰에 포함되면 자동으로 ⚠️ 플래그가 표시됩니다.
          </div>
        </div>
      }
      open={open}
      onCancel={onClose}
      footer={
        <div className="flex justify-end pt-1">
          <Button
            type="primary"
            onClick={onClose}
            style={{ background: '#2f6df0', borderColor: '#2f6df0' }}
          >
            완료
          </Button>
        </div>
      }
      width={560}
    >
      <div className="flex flex-col gap-3 py-2">
        <div className="flex gap-2">
          <Input
            placeholder="새 금칙어 입력"
            value={newWord}
            onChange={e => setNewWord(e.target.value)}
            onPressEnter={addWord}
            className="flex-1"
          />
          <Button
            type="primary"
            onClick={addWord}
            style={{ background: '#2f6df0', borderColor: '#2f6df0' }}
          >
            추가
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={words}
          pagination={false}
          size="small"
          className="border border-border rounded-md overflow-hidden"
        />
      </div>
    </Modal>
  );
};