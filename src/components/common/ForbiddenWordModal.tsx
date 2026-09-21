import { useState } from 'react';
import { Button, Input, Modal, Switch, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { ProhibitedWord } from '../../types';
import { useProhibitedWords } from '../../hooks/useProhibitedWords';
import { useProhibitedWordActions } from '../../hooks/useProhibitedWordActions';

export interface ForbiddenWordModalProps {
  open: boolean;
  onClose: () => void;
}

export const ForbiddenWordModal = ({ open, onClose }: ForbiddenWordModalProps) => {
  const [newWord, setNewWord] = useState('');
  const { data, isLoading } = useProhibitedWords({ page: 0, size: 100 }, { enabled: open });
  const { create, updateStatus, remove } = useProhibitedWordActions();

  const words = data?.prohibitedWordList ?? [];

  const addWord = () => {
    const trimmed = newWord.trim();
    if (!trimmed) return;
    create.mutate(trimmed, { onSuccess: () => setNewWord('') });
  };

  const columns: ColumnsType<ProhibitedWord> = [
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
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => (
        <span className="text-text-muted text-[13px]">{date.slice(0, 10)}</span>
      ),
    },
    {
      title: '활성',
      dataIndex: 'enabled',
      key: 'enabled',
      align: 'center',
      width: 90,
      render: (enabled: boolean, record) => (
        <Switch
          checked={enabled}
          onChange={val => updateStatus.mutate({ wordId: record.id, enabled: val })}
          size="small"
          style={enabled ? { background: '#2f6df0' } : undefined}
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
          onClick={() => remove.mutate(record.id)}
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
            loading={create.isPending}
            style={{ background: '#2f6df0', borderColor: '#2f6df0' }}
          >
            추가
          </Button>
        </div>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={words}
          loading={isLoading}
          pagination={false}
          size="small"
          className="border border-border rounded-md overflow-hidden"
        />
      </div>
    </Modal>
  );
};
