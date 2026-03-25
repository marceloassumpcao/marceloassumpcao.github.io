"use client";

import { useState } from "react";

interface Produto {
  seq: number;
  codigo: string;
  descricao: string;
  unidade: string;
  quantidade: number;
  precoOriginal: number;
  ibs: number;
  cbs: number;
  cashback: number;
  desconto: number;
}

const produtosIniciais: Produto[] = [
  {
    seq: 1,
    codigo: "7891000100103",
    descricao: "LEITE CONDENSADO MOCA LT 395G",
    unidade: "UN",
    quantidade: 1,
    precoOriginal: 4.69,
    ibs: 0.25,
    cbs: 0.15,
    cashback: 0.1,
    desconto: 0,
  },
  {
    seq: 2,
    codigo: "7891000100103",
    descricao: "LEITE CONDENSADO MOCA LT 395G",
    unidade: "UN",
    quantidade: 1,
    precoOriginal: 4.69,
    ibs: 0.25,
    cbs: 0.15,
    cashback: 0,
    desconto: 0,
  },
  {
    seq: 3,
    codigo: "7891000100103",
    descricao: "LEITE CONDENSADO MOCA LT 395G",
    unidade: "UN",
    quantidade: 1,
    precoOriginal: 4.69,
    ibs: 0.25,
    cbs: 0.15,
    cashback: 0.1,
    desconto: 0,
  },
  {
    seq: 4,
    codigo: "7891149200068",
    descricao: "ACUCAR REFINADO UNIAO 1KG",
    unidade: "UN",
    quantidade: 2,
    precoOriginal: 5.49,
    ibs: 0.3,
    cbs: 0.18,
    cashback: 0,
    desconto: 0.5,
  },
  {
    seq: 5,
    codigo: "7896045104512",
    descricao: "ARROZ BRANCO TIPO 1 CAMIL 5KG",
    unidade: "UN",
    quantidade: 1,
    precoOriginal: 27.9,
    ibs: 0.0,
    cbs: 0.0,
    cashback: 0,
    desconto: 0,
  },
  {
    seq: 6,
    codigo: "7891098010575",
    descricao: "FEIJAO CARIOCA KICALDO 1KG",
    unidade: "UN",
    quantidade: 1,
    precoOriginal: 8.99,
    ibs: 0.0,
    cbs: 0.0,
    cashback: 0,
    desconto: 0,
  },
  {
    seq: 7,
    codigo: "7891024134108",
    descricao: "OLEO DE SOJA SOYA 900ML",
    unidade: "UN",
    quantidade: 1,
    precoOriginal: 7.89,
    ibs: 0.42,
    cbs: 0.26,
    cashback: 0,
    desconto: 0,
  },
];

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function getPrecoComImposto(p: Produto) {
  return p.precoOriginal + p.ibs + p.cbs;
}

function getTotalItem(p: Produto) {
  return getPrecoComImposto(p) * p.quantidade;
}

export default function PDVPage() {
  const [produtos] = useState<Produto[]>(produtosIniciais);
  const [selecionado, setSelecionado] = useState(0);

  const produtoAtivo = produtos[selecionado];

  const subtotalOriginal = produtos.reduce(
    (acc, p) => acc + p.precoOriginal * p.quantidade,
    0
  );
  const totalIBS = produtos.reduce((acc, p) => acc + p.ibs * p.quantidade, 0);
  const totalCBS = produtos.reduce((acc, p) => acc + p.cbs * p.quantidade, 0);
  const totalImpostos = totalIBS + totalCBS;
  const totalCashback = produtos.reduce(
    (acc, p) => acc + p.cashback * p.quantidade,
    0
  );
  const totalDesconto = produtos.reduce(
    (acc, p) => acc + p.desconto * p.quantidade,
    0
  );
  const totalFinal = subtotalOriginal + totalImpostos - totalDesconto;

  const now = new Date();
  const hora = now.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="h-screen flex flex-col bg-[#f0f1f3] font-sans text-[#1e1e1e] select-none overflow-hidden">
      {/* Main content */}
      <div className="flex flex-1 min-h-0">
        {/* Left - Product list */}
        <div className="flex-1 flex flex-col border-r border-[#d0d0d0]">
          <div className="bg-[#2d5a3d] text-white px-5 py-3 flex items-center justify-between">
            <h2 className="text-base font-semibold tracking-wide">Produtos</h2>
            <span className="text-sm opacity-80">
              {produtos.length} {produtos.length === 1 ? "item" : "itens"}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto">
            {produtos.map((p, i) => {
              const precoFinal = getPrecoComImposto(p);
              const total = getTotalItem(p);
              const isSelected = i === selecionado;
              const temImposto = p.ibs > 0 || p.cbs > 0;
              const isIsento = p.ibs === 0 && p.cbs === 0;

              return (
                <div
                  key={i}
                  onClick={() => setSelecionado(i)}
                  className={`cursor-pointer border-b border-[#e0e0e0] transition-colors ${
                    isSelected
                      ? "bg-[#dceee3] border-l-4 border-l-[#2d5a3d]"
                      : "hover:bg-[#e8ecea] border-l-4 border-l-transparent"
                  }`}
                >
                  <div className="px-4 py-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <span className="text-xs font-bold text-[#2d5a3d] bg-[#2d5a3d]/10 rounded px-1.5 py-0.5 mt-0.5 shrink-0">
                          {String(p.seq).padStart(3, "0")}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-sm truncate">
                            {p.descricao}
                          </p>
                          <p className="text-xs text-[#666] mt-0.5">
                            {p.codigo} &middot; {p.quantidade.toFixed(3)}{" "}
                            {p.unidade}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <p className="text-base font-bold">
                          R$ {formatBRL(total)}
                        </p>
                        {temImposto && (
                          <div className="flex items-center gap-1.5 justify-end mt-0.5">
                            <span className="text-[10px] text-[#888] line-through">
                              R$ {formatBRL(p.precoOriginal * p.quantidade)}
                            </span>
                            <span className="text-[9px] bg-[#e85d04]/10 text-[#e85d04] font-semibold px-1 py-px rounded">
                              +IBS/CBS
                            </span>
                          </div>
                        )}
                        {isIsento && (
                          <span className="text-[9px] bg-[#2d5a3d]/10 text-[#2d5a3d] font-semibold px-1 py-px rounded">
                            ISENTO
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Price breakdown row */}
                    <div className="flex items-center gap-3 mt-1.5 text-[10px] text-[#888]">
                      <span>
                        Preço: R$ {formatBRL(p.precoOriginal)}
                      </span>
                      {temImposto && (
                        <>
                          <span className="text-[#e85d04]">
                            IBS: +R$ {formatBRL(p.ibs)}
                          </span>
                          <span className="text-[#e85d04]">
                            CBS: +R$ {formatBRL(p.cbs)}
                          </span>
                          <span className="font-medium text-[#333]">
                            = R$ {formatBRL(precoFinal)}/{p.unidade.toLowerCase()}
                          </span>
                        </>
                      )}
                      {p.quantidade > 1 && (
                        <span>x {p.quantidade}</span>
                      )}
                    </div>

                    {(p.cashback > 0 || p.desconto > 0) && (
                      <div className="flex gap-3 mt-1 text-[10px]">
                        {p.cashback > 0 && (
                          <span className="text-[#0a7]">
                            Cashback: R$ {formatBRL(p.cashback)}
                          </span>
                        )}
                        {p.desconto > 0 && (
                          <span className="text-[#c026d3]">
                            Desconto: -R$ {formatBRL(p.desconto)}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right - Product detail & totals */}
        <div className="w-[420px] flex flex-col bg-white">
          {/* Product detail */}
          <div className="bg-[#2d5a3d] text-white px-5 py-3">
            <h2 className="text-base font-semibold tracking-wide">
              Detalhe do Produto
            </h2>
          </div>

          <div className="p-5 border-b border-[#e0e0e0]">
            <h3 className="text-lg font-bold leading-tight">
              {produtoAtivo.descricao}
            </h3>
            <p className="text-xs text-[#888] mt-1">
              Cód: {produtoAtivo.codigo}
            </p>

            {/* Price comparison */}
            <div className="mt-4 rounded-lg border border-[#e0e0e0] overflow-hidden">
              <div className="grid grid-cols-3 text-xs font-semibold text-[#666] bg-[#f8f8f8] px-3 py-2 border-b border-[#e0e0e0]">
                <span>Preço Original</span>
                <span className="text-center">Qtd</span>
                <span className="text-right">c/ Impostos</span>
              </div>
              <div className="grid grid-cols-3 items-center px-3 py-3">
                <span className="text-xl font-bold text-[#333]">
                  {formatBRL(produtoAtivo.precoOriginal)}
                </span>
                <span className="text-center text-lg font-medium text-[#555]">
                  {produtoAtivo.quantidade}{" "}
                  <span className="text-sm text-[#888]">
                    {produtoAtivo.unidade.toLowerCase()}
                  </span>
                </span>
                <span className="text-right text-xl font-bold text-[#2d5a3d]">
                  {formatBRL(getPrecoComImposto(produtoAtivo))}
                </span>
              </div>
            </div>

            {/* Tax detail */}
            {(produtoAtivo.ibs > 0 || produtoAtivo.cbs > 0) ? (
              <div className="mt-3 bg-[#fff7ed] border border-[#fed7aa] rounded-lg p-3">
                <p className="text-xs font-semibold text-[#e85d04] mb-2 flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  Impostos da Reforma Tributária
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between bg-white/80 rounded px-2 py-1.5">
                    <span className="text-[#666]">IBS</span>
                    <span className="font-semibold text-[#e85d04]">
                      + R$ {formatBRL(produtoAtivo.ibs)}
                    </span>
                  </div>
                  <div className="flex justify-between bg-white/80 rounded px-2 py-1.5">
                    <span className="text-[#666]">CBS</span>
                    <span className="font-semibold text-[#e85d04]">
                      + R$ {formatBRL(produtoAtivo.cbs)}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between mt-2 pt-2 border-t border-[#fed7aa] text-sm">
                  <span className="font-medium text-[#666]">
                    Total IBS/CBS
                  </span>
                  <span className="font-bold text-[#e85d04]">
                    + R$ {formatBRL(produtoAtivo.ibs + produtoAtivo.cbs)}
                  </span>
                </div>
              </div>
            ) : (
              <div className="mt-3 bg-[#ecfdf5] border border-[#a7f3d0] rounded-lg p-3">
                <p className="text-sm font-semibold text-[#2d5a3d] flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  Produto isento de IBS/CBS
                </p>
                <p className="text-xs text-[#666] mt-1">
                  Item da cesta básica - alíquota zero
                </p>
              </div>
            )}

            {/* Cashback & Discount for selected item */}
            {(produtoAtivo.cashback > 0 || produtoAtivo.desconto > 0) && (
              <div className="mt-3 flex gap-2">
                {produtoAtivo.cashback > 0 && (
                  <div className="flex-1 bg-[#ecfdf5] border border-[#a7f3d0] rounded-lg p-2.5 text-center">
                    <p className="text-[10px] text-[#666] uppercase tracking-wide font-medium">
                      Cashback
                    </p>
                    <p className="text-lg font-bold text-[#0a7]">
                      R$ {formatBRL(produtoAtivo.cashback)}
                    </p>
                  </div>
                )}
                {produtoAtivo.desconto > 0 && (
                  <div className="flex-1 bg-[#fdf4ff] border border-[#e9d5ff] rounded-lg p-2.5 text-center">
                    <p className="text-[10px] text-[#666] uppercase tracking-wide font-medium">
                      Desconto
                    </p>
                    <p className="text-lg font-bold text-[#c026d3]">
                      - R$ {formatBRL(produtoAtivo.desconto)}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Totals */}
          <div className="flex-1" />
          <div className="p-5 border-t border-[#e0e0e0]">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-[#666]">
                <span>Subtotal (preços originais)</span>
                <span className="font-medium">
                  R$ {formatBRL(subtotalOriginal)}
                </span>
              </div>
              <div className="flex justify-between text-[#e85d04]">
                <span className="flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  Total IBS
                </span>
                <span className="font-medium">
                  + R$ {formatBRL(totalIBS)}
                </span>
              </div>
              <div className="flex justify-between text-[#e85d04]">
                <span className="flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  Total CBS
                </span>
                <span className="font-medium">
                  + R$ {formatBRL(totalCBS)}
                </span>
              </div>

              {totalDesconto > 0 && (
                <div className="flex justify-between text-[#c026d3]">
                  <span>Descontos</span>
                  <span className="font-medium">
                    - R$ {formatBRL(totalDesconto)}
                  </span>
                </div>
              )}

              {totalCashback > 0 && (
                <div className="flex justify-between text-[#0a7]">
                  <span>Cashback</span>
                  <span className="font-medium">
                    R$ {formatBRL(totalCashback)}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-3 pt-3 border-t-2 border-[#2d5a3d] flex justify-between items-end">
              <div>
                <p className="text-xs text-[#888] uppercase tracking-wide font-medium">
                  Total a Pagar
                </p>
              </div>
              <p className="text-3xl font-extrabold text-[#2d5a3d]">
                R$ {formatBRL(totalFinal)}
              </p>
            </div>

            <p className="text-[10px] text-[#aaa] mt-2 text-right">
              CPF/CNPJ: 999.***.***.**  - João Paulo da Silva
            </p>
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="h-10 bg-[#1a1a1a] text-white flex items-center px-4 text-xs gap-6 shrink-0">
        <span className="font-mono">{hora}</span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#22c55e] inline-block" />
          Online
        </span>
        <span className="font-medium">PDV 001</span>
        <span className="text-[#aaa]">Operador: Maria Aparecida da Silva</span>
        <span className="ml-auto text-[#666]">VR Software</span>
      </div>
    </div>
  );
}
